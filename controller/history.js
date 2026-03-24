import movieModel from "../Models/movie.js";
import historyModel from "../Models/history.js"
export const watchMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    console.log("movieId:", movieId);
    console.log("userId:", req.body.userId); 

    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const history = await historyModel.create({
    userId: req.body.userId,
    movieId
});

return res.json({
  success: true,
  data: history
});

  } catch (error) {
    res.status(500).json({ 
        error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
     const { userId } = req.params;

    const history = await historyModel.find({ userId}).populate("movieId")
    return res.json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}