const { Schema, model } = require('mongoose')

const TodoItem = new Schema({
    name: { type: String },
    isDone: { type: Boolean, default: false },
    todoList: { type: Schema.Types.ObjectId, ref: 'TodoList' },
})

module.exports = model('TodoItem', TodoItem)
