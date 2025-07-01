const jwt = require("jsonwebtoken");
require("dotenv").config();


const token_authentication = async (req, res, next) => {
  try {

    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "no token found",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      req.user = payload;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "user unverified, login",
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const isStudent = async (req, res) => {
  try {
    const role = req.user.role;

    if (role != "student") {
      return res.status(401).json({
        success: false,
        message: "you dont have access to this page",
      });
    }

    return res.status(200).json({
      success: true,
      message: "student page authorized",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const role = req.user.role;

    if (role != "admin") {
      return res.status(401).json({
        success: false,
        message: "you dont have access to this page",
      });
    }

    return res.status(200).json({
      success: true,
      message: "admin page authorized",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { token_authentication, isStudent, isAdmin };
