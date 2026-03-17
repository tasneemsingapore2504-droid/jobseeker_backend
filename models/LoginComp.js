const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cemail: String,
  cpassword: String,
});

module.exports = mongoose.model("LogComp", logCompSchema);
