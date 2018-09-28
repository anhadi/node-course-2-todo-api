const {SHA256} = require('crypto-js');

var message = 'I am a user';
var hash = SHA256(message).toString();

console.log(hash);