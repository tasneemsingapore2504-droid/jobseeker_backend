const mongoose = require("mongoose");

const applyFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
    },
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
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ApplyForm", applyFormSchema);
