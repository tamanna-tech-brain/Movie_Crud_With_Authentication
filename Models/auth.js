import mongoose from "mongoose";
const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    userFavorites:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movies",
            required: true
    },
    downloadsAt: [
            {
            movie:  {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Movies",
               required:true
            },
                download:{
                type:Date,
                default: Date.now,
               required: true
               }
            }
        
    ],

},
{
    timestamps: true,
});

const authModel = mongoose.model("auths", authSchema)

export default authModel;