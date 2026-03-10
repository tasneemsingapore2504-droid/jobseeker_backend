const mongoose = require("mongoose");

const applyFormSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  mname: String,
  faname: String,
  email: String,
  pnum: Number,
  cname: String,
  apPos: String,
  dob: Date,
  addws: String,
  addcc: String,
  address: String,
  experience: String,
  uploadRes: String,
  anyDoc: String,
});

module.exports = mongoose.model("ApplyForm", applyFormSchema);
