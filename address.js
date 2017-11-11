/*
    Create bitcoin wallet

    Author: Alex Ishida <alexishida@gmail.com>
    Version: 1.0
    Date: 15/08/2017

    References:
    https://bitcore.io/api/lib/address
    https://bitcore.io/api/lib/public-key
    http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript

    Link to get free testnet btc:
    https://testnet.manu.backend.hamburg/faucet

    Example:
    
    node address.js

*/

const bitcore = require('bitcore-lib');
const crypto = require('crypto');

// if you use mainnet comment the line below
const network = bitcore.Networks.testnet;

const buf = crypto.randomBytes(256);
const hash = bitcore.crypto.Hash.sha256(buf);


var private_key = bitcore.PrivateKey.fromBuffer(hash,network);
var private_key_wif = private_key.toWIF();
var public_key = new bitcore.PublicKey(private_key);
var address = public_key.toAddress();


var bn = bitcore.crypto.BN.fromBuffer(hash);
var private_key_comp = new bitcore.PrivateKey(bn,network);
var private_key_wif_comp = private_key_comp.toWIF();
var public_key_comp = new bitcore.PublicKey(private_key_comp);
var address_comp = public_key_comp.toAddress();


// Return json
var json = "{ \"private_key\": \""+ private_key +"\", \"private_key_wif\": \""+ private_key_wif+ "\", \"public_key\": \""+ public_key+ "\", \"address\": \""+ address+ "\",";
json = json + " \"private_key_compressed\": \""+ private_key_comp +"\", \"private_key_wif_compressed\": \""+ private_key_wif_comp+ "\", \"public_key_compressed\": \""+ public_key_comp+ "\", \"address_compressed\": \""+ address_comp+ "\" }";
console.log(json);


/*console.log("---------------------------------------");
console.log("Rede: " + network);
console.log("---------------------------------------");
console.log("Private Key: " + private_key);
console.log("Private Key WIF: " + private_key_wif);
console.log("Public Key: " + public_key);
console.log("Address: " + address);
console.log("---------------------------------------");
console.log("Private Key Compressed: " + private_key_comp);
console.log("Private Key WIF Compressed: " + private_key_wif_comp);
console.log("Public Key Compressed: " + public_key_comp);
console.log("Address Compressed: " + address_comp);
console.log("---------------------------------------");
*/