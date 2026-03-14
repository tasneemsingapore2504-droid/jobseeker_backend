const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  gender: String,
  mname: String,
  faname: String,
  email: String,
  phone: Number,
  age: Number,
  dob: Date,
  city: String,
  address: String,
  pincode: Number,
  qualification: String,
  university: String,
  percentage: Number,
  experience: String,
  skills: String,
  certificates: String,
  resume: String,
  documents: String,
});

module.exports = mongoose.model("CandidateProfile", candidateSchema);
