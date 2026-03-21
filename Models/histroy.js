import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true
  },

  watchedAt: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true
});

export default mongoose.model("histories", historySchema);