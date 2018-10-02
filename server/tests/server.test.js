const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todos');

var testTodo = {
    _id: new ObjectID(),
    title: 'Test',
    description: 'It is for test'
}
beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(testTodo);
    }).then(() => done());
});

describe('POST /todo/api/v1.0/tasks', () => {
    it('should create a new task', (done) => {
        var todo = {
            title: 'Helloo',
            description: "Hello World"
        };

        request(app)
            .post('/todo/api/v1.0/tasks')
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(todo.title);
            })
            .end(done);
    });
});

describe('GET /todo/api/v1.0/tasks', () => {
    it('should get all the tasks', (done) => {
        request(app)
            .get('/todo/api/v1.0/tasks')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todo/api/v1.0/tasks/:id', () => {
    it('should return the todo with the given id', (done) => {
        request(app)
            .get(`/todo/api/v1.0/tasks/${testTodo._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(testTodo.title);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();

        request(app)
            .get(`/todo/api/v1.0/tasks/${id}`)
            .expect(404)
            .end(done);
    });
    it('should return 400 if the id is invalid', (done) => {
        var id = '5bb281027ec96548442ffd5dsfsf'

        request(app)
            .get(`/todo/api/v1.0/tasks/${id}`)
            .expect(400)
            .end(done);
    });
});

describe('PUT /todo/api/v1.0/tasks/:id', () => {
    it('should return the updated todo', (done) => {
        var todo = {
            title: 'Hassan',
            description: 'Hello world'
        }
    
        request(app)
            .put(`/todo/api/v1.0/tasks/${testTodo._id.toHexString()}`)
            .expect(200)
            .send(todo)
            .expect((res) => {
                expect(res.body.title).toBe(todo.title);
                expect(res.body.description).toBe(todo.description);
                
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();

        request(app)
            .put(`/todo/api/v1.0/tasks/${id}`)
            .expect(404)
            .end(done);
    });
    it('should return 400 if the id is invalid', (done) => {
        var id = '5bb281027ec96548442ffd5dsfsf'

        request(app)
            .put(`/todo/api/v1.0/tasks/${id}`)
            .expect(400)
            .end(done);
    });
});