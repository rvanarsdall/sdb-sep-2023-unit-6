require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controllers/user.controller");

const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DBName = process.env.DBNAME;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL + DBName);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to the DB", DBName);
});

app.use(express.json()); // this will parse any json data that is sent with the request

app.use("/user", userController);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
