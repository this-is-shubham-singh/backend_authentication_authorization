const User = require("../models/user");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password || !role) {
      return res.status(500).json({
        success: false,
        message: "enter valid credentials",
      });
    }

    // check if user already present
    const userData = await User.findOne({ email });
    if (userData) {
      return res.status(500).json({
        success: false,
        message: "user already registered",
      });
    }

    // hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(400).json({
        success: false,
        data: e.message,
        message: "error in hashing password",
      });
    }

    // put everything on db3
    const updatedData = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    updatedData.password = undefined;

    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "user registered",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: e.message,
      message: "signUp failed",
    });
  }
};

// login function
const login = async (req, res) => {
  try {





  } catch (e) {
    res.status(400).json({
      success: false,
      data: e.message,
      message: "login failed",
    });
  }
};

module.exports = { signUp, login };
