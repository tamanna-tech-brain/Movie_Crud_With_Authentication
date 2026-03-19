const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    language: String,
    duration: Number,

    cast: String,
    releaseYear: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const movieModel = mongoose.model("movies", movieSchema)

export default movieModel;