const { Schema, model } = require("mongoose");
const TodoList = require("./TodoList");
const User = require("./User");

const TodoItem = new Schema({
  name: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  todolistID: { type: Schema.Types.ObjectId, ref:TodoList },
  userID: { type: Schema.Types.ObjectId, ref: User },
})

module.exports = model('TodoItem', TodoItem);