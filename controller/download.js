import Movie from "../Models/movie.js";
import Download from "../models/download.js";

export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await Download.create({
      userId: req.user.id,
      movieId: movieId
    });

  } catch (error) {
    res.status(500).json({ 
        error: error.message });
  }
};