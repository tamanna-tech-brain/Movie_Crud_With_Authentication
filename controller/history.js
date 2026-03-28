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
    
     const page = parseInt(req.query.page) || 1;
    const limit = 2;

    const totalHistory = await historymodel.countDocuments({ userId });
    const totalPages = Math.ceil(totalHistory / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    const history = await historymodel
      .find({ userId })
      .populate("movieId")
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({
      success: true,
      data: history,
      page,
      nextPage,
      totalPages,
      totalHistory
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}