export const watchMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await History.create({
      userId: req.user.id,
      movieId
    });

  } catch (error) {
    res.status(500).json({ 
        error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id, movieId  })
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};