const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    title : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = {Todo};