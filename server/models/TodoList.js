const { Schema, model } = require('mongoose')
const TodoItem = require('./TodoItem')
const User = require('./User')

const TodoList = new Schema({
    name: { type: String, unique: true, required: true },
    color: { type: String, default: '' },
    user: { type: Schema.Types.ObjectId, ref: User },
})
TodoList.virtual('items', {
    ref: TodoItem,
    localField: 'id',
    foreignField: 'todoList',
})
/*TodoList.set('toObject', { virtuals: true })
TodoList.set('toJSON', { virtuals: true })*/

module.exports = model('TodoList', TodoList)
