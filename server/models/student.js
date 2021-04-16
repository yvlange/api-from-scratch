const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const StudentSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    courseId: { type: ObjectId, ref: "Courses" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Student", StudentSchema);
