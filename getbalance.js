/*
   Get wallet balance
   
   Author: Alex Ishida <alexishida@gmail.com>
   
   Version: 1.0
   Date: 18/08/2017

   Example::
    
   node getbalance.js n1CAzsAHd4D2QbM3ZLYDzt34uCmNdLV7HS
   
*/
const BlockExplorerLib = require(__dirname + '/blockexplorer-custom-lib');

var blockexplorer_lib = new BlockExplorerLib('testnet');

const params = process.argv;

const my_address = params[2];

var address_balance = blockexplorer_lib.getAddressBalance(my_address).end(function (response) {

    if (response.error) {
        if (response.body === undefined || response.body === null) {
            console.log(JSON.stringify(response));
        } else {
            console.log(JSON.stringify(response.body));
        }
        return;
    } else {
        console.log(JSON.stringify(response.body));
    }
});