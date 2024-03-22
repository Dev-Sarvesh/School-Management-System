const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title:{
    type:String,
  }
  
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
