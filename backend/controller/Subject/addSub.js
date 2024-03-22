const Subject=require('../../model/Schema_Subject')

const SubDetails = async (req, res) => {
  try {
    const { name, title } = req.body;

    if (!name || !title) {
      return res
        .status(400)
        .json({ status: false, message: "Name and Title are mendatory" });
    }

    let subData = {
      name,
      title,
    };

    const newSub = new Subject(subData);
    await newSub.save();

    return res.status(201).json({ status: true, message: "Added SuccessFull" });
  } catch (error) {
    console.log("Error saving user:", error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = SubDetails;
