/*
   Create and send bitcoin transaction
   
   Author: Alex Ishida <alexishida@gmail.com>
   
   Version: 1.0
   Date: 15/08/2017
   
   References:
   https://bitcore.io/playground/#/transaction
   https://bitcore.io/api/lib/transaction
   https://bitcoin.org/en/developer-reference#rpcs

   https://walletgenerator.net/#
   https://testnet.manu.backend.hamburg/faucet

   Frameworks:
   http://unirest.io/nodejs.html



// Testnet wallets for testing

"private_key": "74c24d4b6b39df7bbcb126b13fb1bec98466ad5b550ddd3e18b469e1cb735736", 
"private_key_wif": "92ULccvpdx2u3GYeTPVUKmmrDzRk2ry7cDAUnNQtt3WRjDXAMvb", 
"public_key": "048b7136385dd4eb49c22a885c3664f6195e847ccb981563222f933465ec64028361905370deac01c30d719b9a8abf6174ba50e58e41501b29afe71d5e7c3cfcc8", 
"address": "n2iqkZB6z4Hg8SJKnxcSTBAinWRdqsueUL"



"private_key": "ee1f606104606c3f18d0308a3d000a39dd15ce993e6c9d23cb43dde1d4df2d25", 
"private_key_wif": "93PngexztrMbe54t8t1VrAL9sStDvMAD6qB59Roc7F1Q6zJFoYN", 
"public_key": "04fda123ad9cf6501500d3aa4f18fee746f934937496b59f0b3ae406440cd99ac76096aae5e3914206c52c03cfd2a0ef80833a210811d800ab545fd433f1690b37", 
"address": "mgeW7anFM4ooDuHgCF6DBcVVpHscWQWvzt"



//Examples

node transaction.js n2iqkZB6z4Hg8SJKnxcSTBAinWRdqsueUL mgeW7anFM4ooDuHgCF6DBcVVpHscWQWvzt n2iqkZB6z4Hg8SJKnxcSTBAinWRdqsueUL 92ULccvpdx2u3GYeTPVUKmmrDzRk2ry7cDAUnNQtt3WRjDXAMvb 5876 10000000

node transaction.js mgeW7anFM4ooDuHgCF6DBcVVpHscWQWvzt n2iqkZB6z4Hg8SJKnxcSTBAinWRdqsueUL mgeW7anFM4ooDuHgCF6DBcVVpHscWQWvzt 93PngexztrMbe54t8t1VrAL9sStDvMAD6qB59Roc7F1Q6zJFoYN 5876 10000000

node transaction.js mgeW7anFM4ooDuHgCF6DBcVVpHscWQWvzt mgAzDcm8p99BV6HSQvkMzLnkoKnGnzdcQV mgeW7anFM4ooDuHgCF6DBcVVpHscWQWvzt 93PngexztrMbe54t8t1VrAL9sStDvMAD6qB59Roc7F1Q6zJFoYN 5876 10000000

*/
const BlockExplorerLib = require(__dirname + '/blockexplorer-custom-lib');

var blockexplorer_lib = new BlockExplorerLib('testnet');

// Receive params
const params = process.argv;
const my_address = params[2];
const dest_address = params[3];
const change_address = params[4];
const private_key_wif = params[5];
const fee = parseInt(params[6]);
const amount_btc = parseInt(params[7]);

 // Checks the address balance
var address_balance = blockexplorer_lib.getAddressBalance(my_address).end(function (response) {

    if (response.error) {
        if (response.body === undefined || response.body === null) {
            console.log(JSON.stringify(response));
        } else {
            console.log(JSON.stringify(response.body));
        }
        return;
    } else {

        // Checks the address balance
        if(response.body == 0) {
            console.log(JSON.stringify(response.body));
            return;
        }

        // Get utxos
        var address_utxos = blockexplorer_lib.getAddressUtxos(my_address).end(function (response) {

            if (response.error) {
                if (response.body === undefined || response.body === null) {
                    console.log(JSON.stringify(response));
                } else {
                    console.log(JSON.stringify(response.body));
                }
                return;
            } else {
               
                // Prepare transaction
                var hexa_transaction = blockexplorer_lib.prepareTransaction(response.body, dest_address, amount_btc, fee, change_address, private_key_wif).toString();

                var send_raw_transaction = blockexplorer_lib.sendRawTransaction(hexa_transaction).end(function (response) {
                    if (response.error) {
                        if (response.body === undefined || response.body === null) {
                            console.log(JSON.stringify(response));
                        } else {
                            console.log(JSON.stringify(response.body));
                        }
                        return;
                    } else {
                        // Return txid
                        console.log(JSON.stringify(response.body));
                        return;
                    }
                });

            }

        });
    }
});