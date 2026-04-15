const mongoose = require("mongoose");

const contactFeedbackSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    adminResponse: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ContactFeedback", contactFeedbackSchema);
