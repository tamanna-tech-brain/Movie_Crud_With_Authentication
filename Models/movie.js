import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user is required"]
        },
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        set: (v) => {
    if (v !== v.toLowerCase()) {
      throw new Error("Title must be lowercase");
    }
    return v;
  }
    },
    description: {
        type: String,
        required: true
    },
    categoryId: [
        {
       type: mongoose.Schema.Types.ObjectId,
       ref: "categories",
       required: true,
    },
],
    language: String,

    duration: Number,

    cast: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "casts",
        required: true
    },
],
    releaseYear: Number,
    
},
{
        timestamps:true
    },
);
const movieModel = mongoose.model("movies", movieSchema)

export default movieModel;