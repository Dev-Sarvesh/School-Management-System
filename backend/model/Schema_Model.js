const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  gender: {
    type: String,
  },
  contact: {
    type: String,
  },
  birthDate: {
    type: String,
  },

  address: {
    type: String,
  },
  role: {
    enum: ["ADMIN", "USER"],
    type: String,
    default: "ADMIN",
  },
  course: {
    type: String,
  },

  permissions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
