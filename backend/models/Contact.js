const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['in progress', 'pending', 'completed'],
      default: 'in progress',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
