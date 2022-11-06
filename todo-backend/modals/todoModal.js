const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  activity: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  action: { type: String, required: true, default: "Start" },
  timetaken: { type: String, default: "" },
  start: { type: String },
  end: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true }
})

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;