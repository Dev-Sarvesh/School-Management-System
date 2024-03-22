const Class0 = require("../../model/Schema_Class");

const ClassDetails = async (req, res) => {
  try {
    const { name, title } = req.body;

    if (!name || !title) {
      return res
        .status(400)
        .json({ status: false, message: "Class name and Title are mendatory" });
    }

    let classData = {
      name,
      title,
    };

    const newSub = new Class0(classData);
    await newSub.save();

    return res.status(201).json({ status: true, message: "Added SuccessFull" });
  } catch (error) {
    console.log("Error saving user:", error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = ClassDetails;
