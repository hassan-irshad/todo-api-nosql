const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

var testTodo = {
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
            .status(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});