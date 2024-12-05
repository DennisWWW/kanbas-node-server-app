import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true }, 
  },
  { collection: "assignments" } 
);

export default schema;