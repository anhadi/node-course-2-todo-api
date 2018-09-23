const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ba72bc02449e9360337e6c9';

// if (!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id : id
// }).then((todos) => {
// 	console.log('Todo by find: ', todos)
// })

// Todo.findOne({
// 	_id : id
// }).then((todo) => {
// 	console.log('Todo by findOne: ', todo);
// })

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo by ID ', todo);
// }).catch((e) => {
// 	console.log(e);
// })

var id = '5ba6e7ef965d1c85d4730de9';
User.findById(id).then((user) => {
	if (!user){
		return console.log('User not found');
	}

	console.log(user);
}).catch((e) => {
	console.log(e)
})
