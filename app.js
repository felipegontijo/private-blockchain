/* Adapted - based on code by Jose Morales - jose.morales@udacity.com */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Blockchain = require('./src/blockchain');

class ApplicationServer {

    constructor() {
        this.app = express();
        this.initExpress();
        this.initMiddleware();
        
        this.blockchain = new Blockchain.Blockchain();
        this.initControllers();

        this.spinServer();
    }

    initExpress() {
        this.app.set('port', 8080);
    }

    initMiddleware() {
        this.app.use(morgan("dev"));
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());
    }

    initControllers() {
        require('./blockchainController')(this.app, this.blockchain);
    }

    spinServer() {
        let self = this;
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening on localhost:${self.app.get('port')}`);
        })
    }
}

new ApplicationServer();

