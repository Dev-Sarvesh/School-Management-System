const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title:{
    type:String,
  }
  
});

const Class0 = mongoose.model("Class0", classSchema);
module.exports = Class0;
