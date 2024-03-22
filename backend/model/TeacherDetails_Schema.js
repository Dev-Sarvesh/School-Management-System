const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const techDetails = new mongoose.Schema({
  teacherId: {
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

const teacherAllDetails = mongoose.model("teacherAllDetails", techDetails);
module.exports = teacherAllDetails;
