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

app.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  Student.findByIdAndUpdate(id, req.body, { new: true }).then(
    (updatedStudent) => {
      if (updatedStudent) {
        res.status(200);
        res.json(updatedStudent);
      } else {
        res.status(400);
        res.json({
          error: `Post with ${id} not found`,
        });
      }
    }
  );
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  Student.findByIdAndDelete(id)
    .then((student) => {
      res.status(204);
      res.json(student);
      console.log(`Post with id: ${id} was deleted`);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Post with ${id} not deleted`,
      });
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
