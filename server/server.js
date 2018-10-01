const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');

var app = express();


app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Listenning to the port 3000');
});