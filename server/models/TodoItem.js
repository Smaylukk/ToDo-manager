const { Schema, model } = require('mongoose')

const TodoItem = new Schema(
    {
        name: { type: String, required: true },
        isDone: { type: Boolean, default: false },
        todoList: { type: Schema.Types.ObjectId, ref: 'TodoList' },
    },
    { timestamps: true }
)

module.exports = model('TodoItem', TodoItem)
