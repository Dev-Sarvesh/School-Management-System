const Class0 = require("../../model/Schema_Class");


const getClass = async (req, res) => {
  try {
    const classData = await Class0.find();
    res.status(200).json({ data: classData });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getClass };



