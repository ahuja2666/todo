const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: "done" }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;