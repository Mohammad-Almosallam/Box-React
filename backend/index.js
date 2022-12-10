// const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
// const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
mongoose.set("strictQuery", true);

connectDB();

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

console.log("majd hehe");
//here are the api's

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
