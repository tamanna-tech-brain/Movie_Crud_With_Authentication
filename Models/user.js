import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username must be unique"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    favorites:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    downloads: [
        {
        movie:  {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Movie",
           default: Date.now,
           required: true
        }
    }
    ],
    favouriteStatus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required:true
    },
    history:{
         default: Date.now,
         required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel;