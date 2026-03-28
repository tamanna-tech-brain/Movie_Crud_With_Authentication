import historymodel from "../models/history.js"
import moviemodel from "../models/movie.js"
export const watchMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;
    const movie = await moviemodel.findById(movieId);
     if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }
    const history = await historymodel.create({
    userId: req.body.userId,
    movieId
});

return res.status(201).json({
  success: true,
  data: history,
  message: "Movie watched"
});

  } catch (error) {
    res.status(500).json({ 
        error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
     const { userId } = req.params;

    const history = await historymodel.find({ userId}).populate("movieId")
    return res.json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}