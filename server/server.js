const express = require('express');
const bodyParser = require('body-parser');

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



app.listen(5000, () => {
    console.log('Listenning to the port 3000');
});

module.exports = {app};