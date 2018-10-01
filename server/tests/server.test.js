const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');


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