'use strict';
/*
    Block Explorer API
    Author: Alex Ishida <alexishida@gmail.com>
    Version: 1.0
    Data: 15/08/2017

     https://bitcore.io/api/lib/transaction
     https://bitcoin.org/en/developer-reference#rpcs
     https://testnet.blockexplorer.com/api-ref
*/

// Biblioteca do sdk bitcore
const bitcore = require('bitcore-lib');

// Biblioteca do rest client
const unirest = require('unirest');

class BlockExplorerLib {

    // Select network
    constructor(network_type) {
        if(network_type == 'testnet') {
            this.url_api = 'https://testnet.blockexplorer.com/api';
        }
        else {
            this.url_api = 'https://blockexplorer.com/api';
        }
    }

    getApi(url) {
        let request = unirest.get(this.url_api+url);
        request.headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        request.timeout(3000);
        request.strictSSL(true);
        return request;
    }

    postApi(url,params) {
        let request = unirest.post(this.url_api+url);
        request.headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        request.timeout(3000);
        request.strictSSL(true);
        request.send(params);
        return request;
    }

    getAddressBalance(my_address) {
        return this.getApi('/addr/'+my_address+'/balance');
    }

    getAddressUtxos(my_address) {
        return this.getApi('/addr/'+my_address+'/utxo');
    }

    prepareTransaction(txos, dest_address, amount_btc, fee, change_address, private_key_wif) {
        let transaction = new bitcore.Transaction();
        transaction.from(txos);
        transaction.to(dest_address, amount_btc);
        transaction.fee(fee);
        transaction.change(change_address);
        transaction.sign(private_key_wif);
        return transaction;
    }

    sendRawTransaction(hexa_transaction) {
        let params = {
            "rawtx": hexa_transaction
        };

        return this.postApi('/tx/send',params);
    }
    
};
module.exports = BlockExplorerLib;