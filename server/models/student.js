const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    id: id,
    firstName: String,
    lastName: String,
    course: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Student", StudentSchema);
