const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  age: {
    type: Number,
  },
  Class: {
    type: String,
  },
  subject: {
    type: String,
  },                
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
