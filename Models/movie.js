const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user is required"]
        },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: [
        {
       type: mongoose.Schema.Types.ObjectId,
       ref: "category",
       required: true
    },
],
    language: String,

    duration: Number,

    cast: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
        required: true
    },
],
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