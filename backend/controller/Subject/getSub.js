const Subject = require("../../model/Schema_Subject");


const getSub = async (req, res) => {
  try {
    const subData = await Subject.find();
    res.status(200).json({ data: subData });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSub };



