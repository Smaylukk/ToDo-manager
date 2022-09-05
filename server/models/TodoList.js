const { Schema, model } = require("mongoose");
const TodoItem = require("./TodoItem");
const User = require("./User");

const TodoList = new Schema({
  name: { type: String, unique: true, required: true },
  color: { type: String, default:'' },
  userID: { type: Schema.Types.ObjectId, ref: User },
})

module.exports = model('TodoList', TodoList);