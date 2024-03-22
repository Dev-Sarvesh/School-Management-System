const User = require("../model/Schema_Model");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN PAGE L-8:", req.body);
    console.log(`This User wants to Login with email: ${email}`);

    const findUser = await User.findOne({ email });
    if (!findUser) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "Authentication failed" });
    }

    if (password !== findUser.password) {
      console.log("Incorrect password for email:", email);
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: findUser._id }, "MSD", {
      expiresIn: "1h",
    });

    let redirectPath = '/';
    if (findUser.role === 'USER') {
      redirectPath = '/user';
    } else if (findUser.role === 'ADMIN') {
      redirectPath = '/admin/dashboard';
    }

    res.status(200).json({
      findUser: {
        _id: findUser._id,
        fullName: findUser.fullName,
        email: findUser.email,
        contact: findUser.contact,
      },
      token: token,
      redirectPath: redirectPath, 
    });

    console.log("Login successful: ", token);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = Login;
