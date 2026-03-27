import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  age: Number,

  bio: String,

  image: String 

}, {
  timestamps: true
});

export default mongoose.model("cast", castSchema);