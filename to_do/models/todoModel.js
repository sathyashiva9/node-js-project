const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        
    },
    completed: {
        type: Boolean,
    }
}, { collection: 'todo' });

module.exports = mongoose.model('TodoList', todoSchema);