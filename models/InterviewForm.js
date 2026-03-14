const mongoose = require("mongoose");

const intFormSchema = new mongoose.Schema({
  cname: String,
  intDate: Date,
  intTime: String,
  intPlace: String,
  candidateName: String,
  apPos: String,
  selection: String,
});

module.exports = mongoose.model("InterviewForm", intFormSchema);
