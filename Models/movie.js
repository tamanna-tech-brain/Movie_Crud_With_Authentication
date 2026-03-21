const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", //kis ke liye 
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
    categoryId: [
        {
       type: mongoose.Schema.Types.ObjectId,
       ref: "categoriesId",
       required: true
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

    createdAt: {
        type: Date,
        default: Date.now
    },
    
},
);
const movieModel = mongoose.model("movies", movieSchema)

export default movieModel;