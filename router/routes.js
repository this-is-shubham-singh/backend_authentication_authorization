const express = require("express");
const Router = express.Router();

const { login, signUp } = require("../controllers/authentication");

Router.post("/login", login);
Router.post("/signUp", signUp);

module.exports = Router;
