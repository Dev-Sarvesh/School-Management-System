const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
