const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cname: String,
  cemail: String,
  website: String,
  cpassword: String,
  repasswd: String,
});

module.exports = mongoose.model("RegComp", regCompSchema);
