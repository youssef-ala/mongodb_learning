require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use("/upload", express.static(path.join(__dirname, "upload")));

const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");

const uri = process.env.MONGO_URL;

mongoose.connect(uri).then(() => {
  console.log("mongodb server start");
});

app.use(cors());
app.use(express.json());
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");

app.use("/api/courses", coursesRouter); // /api.courses
app.use("/api/users", usersRouter); // /api/users
// global middleware for not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This Resource Is Not Available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

// create course
// app.post("/api/courses", query("title", "price").notEmpty(), (req, res) => {
//   console.log(req.body);

//   courses.push({ id: courses.length + 1, ...req.body });

//   res.status(201).json(courses);
// });

//http://localhost:3000/api/courses?limit=3&page=2
