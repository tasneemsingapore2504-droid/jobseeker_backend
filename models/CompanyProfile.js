const mongoose = require("mongoose");

const compProfSchema = new mongoose.Schema({
  employerId: String,
  cname: String,
  website: String,
  cemail: String,
  cpnum: Number,
  address: String,
  csize: String,
  branch: String,
  status: String,
});

module.exports = mongoose.model("CompanyProfile", compProfSchema);
