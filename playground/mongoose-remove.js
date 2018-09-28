const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
// 	console.log(result);
// })

// Todo.findOneAndRemove({
// 	text: 'Second test todo'
// }).then((removedTodo) => {
// 	return console.log(`deleted todo: ${removedTodo}`)
// })

// Todo.findByIdAndRemove({
// 	_id: '5ba7df73eed4a977f73c0511'
// }).then((todo) => {
// 	return console.log(`deleted todo: ${todo}`)
// })