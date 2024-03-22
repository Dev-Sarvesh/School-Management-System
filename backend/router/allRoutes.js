const express = require("express");
const router = express.Router();
const Login = require("../controller/Login");
const HandleData = require("../controller/SignUp");
const { getUser,getStudent,TeacherDetails } = require("../controller/user");
const User = require("../model/Schema_Model");
const upload = require("../middleWareAuth/FileUploadMalter");

const SubDetails = require("../controller/Subject/addSub");
const {getSub}=require('../controller/Subject/getSub');

const ClassDetails=require("../controller/Class/ClassPlus");
const {getClass}=require("../controller/Class/getClass")

const {AddStudent} =require("../controller/student/addStudent")
const TeacherPost=require("../controller/TeacherCo/Teacheradd")



//Handle Upload file
router.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
  console.log(req.file);
});

// Handle user signup
router.post("/", async (req, res) => {
  await HandleData(req, res, "signup");
});

// Handle user registration and signup
router.post("/signup", async (req, res) => {
  await HandleData(req, res, "signup");
});

router.post("/register", upload.single("file"), async (req, res) => {
  await HandleData(req, res, "register");
});

// Get user data
router.get("/getdata", async (req, res) => {
  await getUser(req, res);
});

// Handle user login
router.post("/login", async (req, res) => {
  await Login(req, res);
});

// Handle user deletion
router.post("/delete/res/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID deom Delete:", id);

    if (!id) {
      return res.status(400).json({ error: "userId is required" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/userData", (req, res) => {
  var data = req.body;
  res.send("bye");
  console.log("data 67 ", data);
});

//Handle user update/Edit
router.post("/edit", async (req, res) => {
  try {
    const { _id } = req.body;
    const newData = req.body;
    // console.log("newData:",req)

    console.log("newData:", newData);
    if (!_id) {
      return res.status(400).json({ error: "userId is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(_id, newData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user information
router.get("/user", getUser);

// Get user information by ID
router.get("/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Add Subjects
router.post("/addSubject", SubDetails);

//get Sub
router.get('/getSub',async (req,res)=>{
 await getSub(req,res)
})

//Add Class
router.post("/addClass",ClassDetails);

//get Class
router.get('/getClass',async (req,res)=>{
  await getClass(req,res)
 })

//add Students
router.post("/addStudent",AddStudent);

//get Students
router.get('/allStudents',async (req,res)=>{
  await getStudent(req,res)
 })

 //aadTeacher
 router.post("/teacher",async (req,res)=> {
  await TeacherPost(req,res)
})

 //getTeacherDetails
 router.get('/teacherDetails',async (req,res)=>{
  await TeacherDetails(req,res)
 })


module.exports = router;
