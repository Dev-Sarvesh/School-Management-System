const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const studentDetails = new mongoose.Schema({
  studentId: {
    type: ObjectId,
    ref: "Student",
  },
  classId: {
    type: ObjectId,
    ref: "Class0",
  },
  subjectId: {
    type: ObjectId,
    ref: "Subject",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const StudDetails = mongoose.model("Stud", studentDetails);
module.exports = StudDetails;
