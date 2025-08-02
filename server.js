require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB."));

app.use(express.json());

const postsRoutes = require("./routes/postRoutes");
app.use("/posts", postsRoutes);

const usersRouter = require("./routes/userRoutes");
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";
  res.status(statusCode).json({
    message: message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}.`));
