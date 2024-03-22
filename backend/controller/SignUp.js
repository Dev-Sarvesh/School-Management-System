// const User = require("../model/Schema_Model");

// const HandleData = async (req, res, pageType) => {
//   try {
//     const {
//       fullName,
//       email,
//       contact,
//       password,
//       confirmPassword,
//       birthDate,
//       gender,
//       address,
//       course,
//       file,
//       role,
//     } = req.body;

//     if (!fullName || !email) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Full name and email are required" });
//     }

//     let userData = {};

//     if (pageType === "signup") {
//       if (!contact || !password || !confirmPassword) {
//         return res.status(400).json({
//           status: false,
//           message:
//             "Contact, password, and confirm password are required for signup",
//         });
//       }
//       userData = {
//         pageType: "signup",
//         fullName,
//         email,
//         contact,
//         password,
//         confirmPassword,
//         role: role,
//       };
//     } else if (pageType === "register") {
//       if (!birthDate || !address || !course || !req.file || !contact || !password || !confirmPassword) {
//         return res.status(400).json({
//           status: false,
//           message:
//             "Birth date, address,file Upload and course are required for registration",
//         });
//       }
//       userData = {
//         fullName,
//         email,
//         birthDate,
//         address,
//         gender,
//         course,
//         contact,
//         password,
//         confirmPassword,
//         file,
//         pageType: "register",
//         role: role,
//       };

//       if(req.file){
//         userData.file=req.file.path
//       }
//     } else {
//       return res
//         .status(400)
//         .json({ status: false, message: "Invalid page type" });
//     }

//     console.log("userData", userData);

//     const newUser = new User(userData);
//     await newUser.save();

//     console.log("UserInfo:", newUser);

//     const successMessage =
//       pageType === "signup" ? "Signup successful!" : "Registration successful!";

//     return res.status(201).json({ status: true, message: successMessage });
//   } catch (error) {
//     console.log("Error saving user:", error);

//     return res
//       .status(500)
//       .json({ status: false, error: "Internal Server Error" });
//   }
// };

// module.exports = HandleData;

const User = require("../model/Schema_Model");

const HandleData = async (req, res, pageType) => {
  try {
    const {
      fullName,
      email,
      contact,
      password,
      confirmPassword,
      birthDate,
      gender,
      address,
      course,
      file,
      role,
    } = req.body;

    if (!fullName || !email) {
      return res
        .status(400)
        .json({ status: false, message: "Full name and email are required" });
    }

    let userData = {
      fullName,
      email,
      birthDate,
      address,
      gender,
      course,
      contact,
      password,
      confirmPassword,
      file,
      pageType: "register",
      role: role,
    };
    if (req.file) {
      userData.file = req.file.path;
    }

    const newUser = new User(userData);
    await newUser.save();

    const successMessage =
      pageType === "signup" ? "Signup successful!" : "Registration successful!";

    return res.status(201).json({ status: true, message: successMessage });
  } catch (error) {
    console.log("Error saving user:", error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = HandleData;
