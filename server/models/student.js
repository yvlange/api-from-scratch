const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const StudentSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    courseId: { type: ObjectId, ref: "Course" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Student", StudentSchema);
