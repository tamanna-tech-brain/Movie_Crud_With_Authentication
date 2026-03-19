const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"]
        },
    title: String,
    description: String,
    category: {
        type: "string",
        enum: ["horror", "comedy", "action","drama", "thrill"]
       
    },
    language: String,
    duration: Number,

    cast: String,
    releaseYear: Number,

    createdAt: {
        type: Date,
        default: Date.now
    },
    
},{
        timestamps:true
    }
);
const movieModel = mongoose.model("movies", movieSchema)

export default movieModel;