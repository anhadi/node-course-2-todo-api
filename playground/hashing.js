const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';
var password2 = 'abc123';

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password2, salt, (err, hash) => {
		console.log(hash);
	})
})

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	})
// });

var hashedPassword = '$2a$10$RBagtaqidSkS9K1dairZBeh3/cmWZPorkzsRL3gUirH9CzPsUWS7y';

 bcrypt.compare(password, hashedPassword, (err, result) =>{
 	 console.log(result);
 });

// var message = 'I am a user';
// var hash = SHA256(message).toString();

// console.log(hash);

