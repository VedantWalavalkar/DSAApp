import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  completed: { type: Boolean, default: false }
});

export default mongoose.model("Progress", progressSchema);
