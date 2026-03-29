const mongoose = require("mongoose");

const compProfSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,

      required: false,
      unique: true,
    },
    cname: String,
    website: String,
    cemail: String,
    cpnum: Number,
    address: String,
    csize: String,
    branch: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("CompanyProfile", compProfSchema);
