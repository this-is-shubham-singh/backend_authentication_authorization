const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "enter valid credentials",
      });
    }

    const userData = await user.findOne({ email });
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "no user found",
      });
    }

    const isCorrect = await bcrypt.compare(password, userData.password);
    if (!isCorrect) {
      return res.status(401).json({
        success: false,
        message: "wrong password",
      });
    }

    // token creation
    // token(payload, secret key, options)
    const payload = { 
      id: userData._id,
      email: userData.email,
      role: userData.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // cookie creation
    // cookie(name, value, options)
    // res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    return res.status(200).json({
      success: true,
      message: "logged in",
      user: {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        token,
      },
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: e.message,
      message: "login failed",
    });
  }
};

module.exports = { signUp, login };
