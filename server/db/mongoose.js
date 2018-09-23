var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://annisahadi:cerulean1@ds149268.mlab.com:49268/todoapp'
// };
// mongoose.connect( db.localhost || db.mlab);

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
// mongoose.connect('mongodb://annisahadi:rusty1@ds111993.mlab.com:11993/todosapp', { useNewUrlParser: true });

module.exports = {mongoose};



