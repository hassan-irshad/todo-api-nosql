const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');

var app = express();

app.use(bodyParser.json());

app.post('/todo/api/v1.0/tasks', (req, res) => {
    var todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
    });
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send();
    });
});

app.get('/todo/api/v1.0/tasks', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send(todos);
    }, (e) => {
        res.status(400).send();
    });
});

app.get('/todo/api/v1.0/tasks/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }

        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.put('/todo/api/v1.0/tasks/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'description', 'done']);

    
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }


    Todo.findOneAndUpdate({
        _id: id
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todo/api/v1.0/tasks/:id', (req, res) => {
    var id  = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(5000, () => {
    console.log('Listenning to the port 5000');
});

module.exports = {app};