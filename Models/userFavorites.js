import mongoose from "mongoose";

const userFavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true
  }

}, {
  timestamps: true
});

export default mongoose.model("userFavorites", userFavoriteSchema);