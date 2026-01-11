import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: String,
  topic: String,
  leetcode: String,
  youtube: String,
  article: String,
  level: String
});

export default mongoose.model("Problem", problemSchema);
