const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/student");
const Course = require("./models/course");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/students", (req, res) => {
  Student.create(req.body).then((newStudent) => {
    res.status(201);
    res.json(newStudent);
  });
});

app.get("/students", (req, res) => {
  Student.find().then((students) => {
    res.status(200);
    res.json(students);
  });
});

app.get("/students", (req, res) => {
  res.json({
    "/courses": "nothing yet",
  });
});

mongoose.connect("mongodb://localhost/bootcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
