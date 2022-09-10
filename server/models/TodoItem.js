const { Schema, model } = require("mongoose");
const TodoList = require("./TodoList");
const User = require("./User");

const TodoItem = new Schema({
  name: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  todolist: { type: Schema.Types.ObjectId, ref:TodoList },
  user: { type: Schema.Types.ObjectId, ref: User },
})

module.exports = model('TodoItem', TodoItem);