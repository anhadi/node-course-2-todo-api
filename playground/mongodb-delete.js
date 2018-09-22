// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unable to connect to mongodb server');
	}
	console.log('Connected to mongodb server');

	const db = client.db('TodoApp');

	// db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
	// 	console.log(result);
	// })

	// db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
	// 	console.log(result);
	// })

	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// })

	// db.collection('Users').deleteMany({name:'Aldwin'}).then((result) => {
	// 	console.log(result);
	// })

	db.collection('Users').findOneAndDelete({_id: new ObjectID('5ba6b52b66b30352bea9bbcc')}).then((result) => {
		console.log(result);
	})
	// client.close();
});