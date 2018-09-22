// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unable to connect to mongodb server');
	}
	console.log('Connected to mongodb server');

	const db = client.db('TodoApp');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5ba6a506c246d34b54a1aa24')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2)); 
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// } )

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err)
	// } )

	db.collection('Users').find({name:'Annisa'}).toArray().then((doc) => {
		console.log(`User`)
		console.log(JSON.stringify(doc, undefined, 2));
	}, (err) => {
		console.log('unable to find', err);
	})

	// client.close();
});