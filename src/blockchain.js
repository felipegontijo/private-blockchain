/**
 *      The Blockchain class contain the basics functions to create the private blockchain
 *      It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *      to verify a message signature. The chain is stored in the array
 *      `this.chain = [];`. Of course each time you run the application the chain will be empty because an array
 *      isn't a persisten storage method.
 *  
 *      Based on code by jose.morales@udacity.com
 */

const SHA256 = require('crypto-js/sha256');
const Block = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialize the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    async initializeChain() {
        if( this.height === -1) {
            let block = new Block.Block('Genesis Block');
            await this._addBlock(block);
        }
    }

    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
           try {
               let newBlock = block;
               let chainHeight = await self.getChainHeight();
               newBlock.height = chainHeight + 1;
               newBlock.timestamp = new Date().getTime().toString().slice(0, -3);
               if (chainHeight >= 0) {
                   let previousBlock = await self.getLastBlock();
                   newBlock.previousHash = previousBlock.hash;
                } else {
                    newBlock.previousHash = null;
                }
               newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
               self.chain.push(newBlock);
               self.height = chainHeight + 1;
               resolve(newBlock)
            } catch (error) {
                reject(error)
            }
        });
    }

    getChainHeight() {
        let self = this;
        return new Promise((resolve, reject) => {
            resolve(self.height);
        });
    }

    getLastBlock() {
        let self = this;
        return new Promise((resolve, reject) => {
            resolve(self.chain[self.height]);
        })
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign with your Bitcoin Wallet
     * The method returns a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            resolve(`${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`);
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            try {
                // grab time from message received
                let messageTime = parseInt(message.split(':')[1]);
                // get the current time and check if < 5 minutes difference
                let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
                let timeDifference = currentTime - messageTime;
                if (timeDifference < 300000) {
                    let messageIsVerified = bitcoinMessage.verify(message, address, signature);
                    if (messageIsVerified) {
                        let data = {
                            owner: address,
                            star: star
                        }
                        let block = new Block.Block(data);
                        await self._addBlock(block);
                        resolve(block);
                    }
                } else {
                    reject('Time elapsed is greater than 5 minutes!')
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                const desiredBlock = self.chain.filter(block => block.hash === hash)[0];
                resolve(desiredBlock);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = (self.chain.filter(b => b.height === height))[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * that belongs to the owner with the wallet address passed as parameter.
     * @param {*} address 
     */
    getStarsByWalletAddress(address) {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                let stars = self.chain.filter(block => block.getDecodedData().owner === address)
                stars.forEach(star => {
                    star = star.getDecodedData();
                })
                resolve(stars);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     */
    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            self.chain.forEach(block => {
                try {
                    await block.validate();
                    if (block.previousHash !== null) {
                        let chainValid = (auxHash === block.previousHash);
                        if (!chainValid) throw error;
                    }
                } catch (error) {
                    errorLog.push(error);
                    continue;
                }
                let auxHash = block.hash;
            });
            resolve(errorLog);
        });
    }

}

module.exports.Blockchain = Blockchain;   