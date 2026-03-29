const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    _jid: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: false,
      unique: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: String,
    title: String,
    description: String,
    requirement: String,
    qualification: String,
    skills: String,

    salary: Number,

    jobType: String,
    lastDate: String,
    workMode: String,

    country: String,
    state: String,
    city: String,
    link: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("JobPost", jobPostSchema);
