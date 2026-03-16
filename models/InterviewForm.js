const mongoose = require("mongoose");

const intFormSchema = new mongoose.Schema(
  {
    cname: String,
    intDate: String,
    intTime: String,
    intPlace: String,
    candidateName: String,
    apPos: String,
    selection: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("InterviewForm", intFormSchema);
