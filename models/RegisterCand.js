const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  email: String,
  phone: Number,
  dob: Date,
  password: String,
  repasswd: String,
});

module.exports = mongoose.model("RegCand", regCandSchema);
