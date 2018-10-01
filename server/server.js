const express = require('express');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');


var todo = new Todo({
    title: 'Node',
    description: 'Welcome to the node course'
});

todo.save().then((doc) => {
    console.log(doc);
}, (e) => {
    console.log(e);
});