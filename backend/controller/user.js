const User = require("../model/Schema_Model");
const Student = require("../model/Schema_Student");
const StudDetails=require("../model/Schema_StudentDetails");
const teacherAllDetails=require("../model/TeacherDetails_Schema");

const getUser = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "StudentResult",
        },
      },

      {
        $unwind: "$StudentResult",
      },

      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "SubjectResult",
        },
      },

      {
        $unwind: "$SubjectResult",
      },
      {
        $lookup: {
          from: "class0",
          localField: "classId",
          foreignField: "_id",
          as: "ClassResult",
        },
      },

      {
        $unwind: "$ClassResult",
      },
    ];
    const dataFromMongo = await StudDetails.aggregate(pipeline);

    // console.log("dataFromMongo",dataFromMongo)
    res.status(200).json({ data: dataFromMongo });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const TeacherDetails = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "TeacherResult",
        },
      },

      {
        $unwind: "$TeacherResult",
      },

      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "SubjectResult",
        },
      },

      {
        $unwind: "$SubjectResult",
      },
      {
        $lookup: {
          from: "class0",
          localField: "classId",
          foreignField: "_id",
          as: "ClassResult",
        },
      },

      {
        $unwind: "$ClassResult",
      },
    ];
    const dataFromMongo = await teacherAllDetails.aggregate(pipeline);

    console.log("dataFromMongo",dataFromMongo)
    res.status(200).json({ data: dataFromMongo });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getUser, getStudent,TeacherDetails };
