const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('should create new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err) => {
				if(err){
					return done(err);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done(); 
				}).catch((e) => done(e));
			});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err) => {
				if(err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done()
				}).catch((e) => done(e));
			});

	});
});

describe("GET /todos route", () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2)
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	})

	it('should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	})

	it('should retunr 404 for non-object ids', (done) => {

		request(app)
			.get('/todos/123abc')
			.expect(404)
			.end(done);
	})
})

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId );
			})
			.end((err,res) => {
				if(err){
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo).toBeNull();
					done(); 
				}).catch((e) => done(e));

			});
	})

	it('should return a 404 if todo not found', (done) => {
		var hexId = new ObjectID();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	})

	it('should return a 404 if objectID is invalide', (done) => {
		request(app)
			.delete('/todos/123abc')
			.expect(404)
			.end(done);

	})
})

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'This will be the updated text'; 
		
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				text:text,
				completed: true
			})
			.expect(200)
			.expect((res)=> {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeGreaterThan(0)			})
			.end(done)
	})

	it('should clear completedAt when todo not completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'This will be the SECOND updated text'; 
		
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				text:text,
				completed: false
			})
			.expect(200)
			.expect((res)=> {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeNull();
			})
			.end(done)
	})
})

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {

		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	})

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	})
})

describe('POST /users', () => {
	it('should create a user', (done) => {
		var email = 'aldwin@example.com';
		var password = 'abc123';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toBeTruthy();
				expect(res.body._id).toBeTruthy();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if(err){
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toBeTruthy();
					expect(user.password).not.toBe(password);
					done();
				}).catch((e) => done(e));
			});
	})

	it('should return validation errors if request invalid', (done) => {
		var email = 'abc';
		var password = 'abc';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(400)
			.end(done);
	})

	it('should not create user of email in use', (done) => {
		var email = users[0].email;
		var password = 'abc123'

		request(app)
			.post('/users')
			.send({email, password})
			.expect(400)
			.end(done);
	})
})

describe('POST /users/login', () => {
	it('should login user and return auth token', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password
			})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toBeTruthy();
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens[0]).toHaveProperty('token', res.headers['x-auth']);
					expect(user.tokens[0]).toHaveProperty('access', 'auth');
					done();
				}).catch((e) => done(e));
			})
	})

	it('should reject invalid login', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password + 'a'
			})
			.expect(400)
			.expect((res) => {
				expect(res.headers['x-auth']).toBeFalsy();
				expect(res.body).toEqual({});
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens.length).toBe(0);
					done();
				}).catch((e) => done(e));
			})
	})
})

describe('DELETE /users/me/tokens', () => {
	it('should remove auth token on logout', (done) => {
		request(app)
			.delete('/users/me/token')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.end((err, user) => {
				if(err){
					done(err);
				}

				User.findById(users[0]._id).then((user) => {
					expect(user.tokens.length).toBe(0);
					done();
				}).catch((e) => done(e));
			})
	})
})












