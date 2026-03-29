const mongoose = require("mongoose");

const intFormSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
    cname: String,
    intDate: String,
    intTime: String,
    intPlace: String,
    candidateName: String,
    apPos: String,
    selection: {
      type: String,
      enum: ["pending", "selected", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("InterviewForm", intFormSchema);
