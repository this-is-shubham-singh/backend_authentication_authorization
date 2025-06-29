const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("database connection successfull");
  } catch (e) {
    console.log(e.message);
    console.log("database connection failed");
    process.exit(1);
  }
};

module.exports = dbConnect;
