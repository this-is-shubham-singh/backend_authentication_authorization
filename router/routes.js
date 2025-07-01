const express = require("express");
const Router = express.Router();

const { login, signUp } = require("../controllers/authentication");
const {
  token_authentication,
  isStudent,
  isAdmin,
} = require("../middleware/auth");

Router.post("/login", login);
Router.post("/signUp", signUp);
Router.post("/student", token_authentication, isStudent, (req, res) => {});
Router.post("/admin", token_authentication, isAdmin, (req, res) => {});

module.exports = Router;
