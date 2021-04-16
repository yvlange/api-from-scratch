const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/student");
const Course = require("./models/course");

const app = express();

app.use(express.json());
app.use(cors());

//Get all students in a single course
app.get("/courses/:courseId/students", (req, res) => {
  Student.find().then((students) => {
    res.status(200);
    res.json(students);
  });
});

//Get a single student in a specific course

app.get("/courses/:courseId/students/:studentId", (req, res) => {
  const { id } = req.params;
  Student.findById(id).then((students) => {
    res.status(200);
    res.json(students);
  });
});

// Get all students

app.get("/students", (req, res) => {
  Student.find().then((students) => {
    res.status(200);
    res.json(students);
  });
});

//Get all courses

app.get("/courses", (req, res) => {
  Course.find().then((courses) => {
    res.status(200);
    res.json(courses);
  });
});

//Get a specific course

app.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  Course.findById(id).then((courses) => {
    res.status(200);
    res.json(courses);
  });
});

//Post a single course

app.post("/courses", (req, res) => {
  Course.create(req.body).then((newCourse) => {
    res.status(201);
    res.json(newCourse);
  });
});

//Add a single student to a specific course

app.post("/courses/:courseId/students", (req, res) => {
  Student.create(req.body).then((newStudent) => {
    res.status(201);
    res.json(newStudent);
  });
});

//Edit a specific course

app.patch("/courses/:courseId", (req, res) => {
  const { id } = req.params;
  Course.findByIdAndUpdate(id, req.body, { new: true }).then(
    (updatedCourse) => {
      if (updatedCourse) {
        res.status(200);
        res.json(updatedCourse);
      } else {
        res.status(400);
        res.json({
          error: `Post with ${id} not found`,
        });
      }
    }
  );
});

//Edit a specific student

app.patch("/students/studentId", (req, res) => {
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

//Deleting a course

app.delete("/courses/:courseId", (req, res) => {
  const { id } = req.params;
  Course.findByIdAndDelete(id)
    .then((course) => {
      res.status(204);
      res.json(course);
      console.log(`Post with id: ${id} was deleted`);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error: `Post with ${id} not deleted`,
      });
    });
});

//Delete a student

app.delete("/students/:studentId", (req, res) => {
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

// app.get("/students", (req, res) => {
//   res.json({
//     "/courses": "nothing yet",
//   });
// });

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
