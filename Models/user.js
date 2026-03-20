import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    userFavorites:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
    }
],

    downloads: [
        {
        movie:  {
           type: mongoose.Schema.Types.ObjectId,
           ref: "movies",
           required:true
        },
            downloadAt:{
            type:Date,
            default: Date.now,
           required: true
           }
        }
    
    ],
    history:[
        {
            movie:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"movies"
            },
            watchAt: {
            type: Date,
            default: Date.now,
            required: true
            }
    }
]
},
{
    timestamps: true,
});

const userModel = mongoose.model("users", userSchema)

export default userModel;