const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const routes = require("./router/routes");
app.use("/api/v1", routes);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`running at port ${PORT} `);
});
