const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  password: { type: String },
  role: { type: String, enum: ["admin", "student", "faculty"] },
});

module.exports = mongoose.model("User", userSchema);
