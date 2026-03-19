const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"]
        },
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "title",
        required: true
    },
    description: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "description",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    language: String,

    duration: Number,

    cast: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "casts"
    },
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