/**
 *      The Block class will store the data and act as a dataset for the application.
 *      The class will expose a method to validate the data... The body of
 *      the block will contain an Object that contain the data to be stored,
 *      the data should be stored encoded.
 *      All the exposed methods should return a Promise to allow all the methods 
 *      run asynchronous.
 * 
 *      Based on code by jose.morales@udacity.com
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           
		this.height = 0;                                            
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   
		this.timestamp = 0;                                           
		this.previousHash = null;                              
    }
    
    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data - as a consequence the hash of the block should be different.
     * 
     */
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash;
            self.hash = null; //reset hash for recalculation
            let newHash = SHA256(JSON.stringify(self)).toString();
            self.hash = currentHash;
            resolve(currentHash===newHash);
        });
    }

    getDecodedData() {
        let encodedData = this.body;
        let decodedData = JSON.parse(hex2ascii(encodedData));
        return decodedData;
    }
}

module.exports.Block = Block;