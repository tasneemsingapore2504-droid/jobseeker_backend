const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  jobId: Number,
  employerId: Number,
  candidateId: Number,

  title: String,
  description: String,
  requirement: String,
  salary: Number,

  jobType: String,
  workMode: String,

  education: String,

  country: String,
  state: String,
  city: String,
});

module.exports = mongoose.model("JobPost", jobPostSchema);
