/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create the private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because an array
 *  isn't a persisten storage method.
 *  
 *  Based on code by jose.morales@udacity.com
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
        // check if there is a Genesis block already
        if( this.height === -1) {
            let block = new Block.Block('Genesis Block');
            await this._addBlock(block);
        }
    }

    _addBlock(block) {
        let self = this; // allows access to chain inside promise
        return new Promise(async (resolve, reject) => {
           try {
               // assign previousHash if not genesis block
               if (self.height >= 0) {
                   block.previousHash = self.getLatestBlock().hash;
                }
               // we also need to assign the new block's correct height (currentHeight++)
               block.height = self.height++;
               // assign timestamp
               block.timestamp = new Date().getTime().toString().slice(0, -3);
               // generate block hash
               block.hash = SHA256(JSON.stringify(block)).toString();
               // push block onto the chain
               self.chain.push(block);
               // increment chain height
               self.height = self.height++;
               // resolve
               resolve(block)
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

    getLatestBlock() {
        let self = this;
        return new Promise((resolve, reject) => {
            resolve(self.chain[self.getChainHeight()]);
        })
    }


    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
           
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
            let block = self.chain.filter(p => p.height === height)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */
    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            
        });
    }

}

module.exports.Blockchain = Blockchain;   