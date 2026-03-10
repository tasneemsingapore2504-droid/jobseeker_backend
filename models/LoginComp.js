const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cemail: String,
  password: String,
});

module.exports = mongoose.model("LogComp", logCompSchema);
