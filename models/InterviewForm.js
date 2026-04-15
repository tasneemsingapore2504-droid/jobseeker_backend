const mongoose = require("mongoose");

const intFormSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterComp",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterComp",
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApplyForm",
    },
    jobId: {
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
    interviewResult: {
      type: String,
      enum: ["pending", "selected", "rejected"],
      default: "pending",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("InterviewForm", intFormSchema);
