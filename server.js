require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB."));

app.listen(process.env.PORT, () =>
  console.log(`Server has started on port ${process.env.PORT}.`)
);
