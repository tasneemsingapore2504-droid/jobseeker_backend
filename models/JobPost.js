const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("JobPost", jobPostSchema);
