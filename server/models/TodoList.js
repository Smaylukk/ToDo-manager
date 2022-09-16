const { Schema, model } = require('mongoose')
const TodoItem = require('./TodoItem')
const User = require('./User')

const TodoList = new Schema(
    {
        name: { type: String, required: true },
        color: { type: String, default: '' },
        user: { type: Schema.Types.ObjectId, ref: User },
    },
    { timestamps: true }
)
TodoList.virtual('items', {
    ref: TodoItem,
    localField: 'id',
    foreignField: 'todoList',
})

module.exports = model('TodoList', TodoList)
