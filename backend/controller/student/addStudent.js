const Student = require("../../model/Schema_Student");
const Class0 = require("../../model/Schema_Class");
const Subject = require("../../model/Schema_Subject");
const StudDetails = require("../../model/Schema_StudentDetails");

const AddStudent = async (req, res) => {
  try {
    const { name, fatherName, age, Class, subject } = req.body;

    if (!fatherName || !subject) {
      return res.status(400).json({
        status: false,
        message: "FatherName and Subjects are required",
      });
    }

    const newUser = new Student({
      name,
      fatherName,
      age,
      Class,
      subject,
    });

    const result = await newUser.save();
    console.log("result:", result);

    const class0 = await Class0.findOne({ name: Class });
    const subjectObj = await Subject.findOne({ name: subject });
    
    const details = new StudDetails({
      classId: class0._id,
      subjectId: subjectObj._id,
      studentId: result._id,
    });

    const result2 = await details.save();
    console.log("Details:", result2);

    return res
      .status(201)
      .json({ status: true, message: "Successfully Created!" });
  } catch (error) {
    console.log("Error saving user:", error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = { AddStudent };
