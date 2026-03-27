import movieModel from "../Models/movie.js";
import downloadModel from "../Models/downloads.js"

export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;


    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  
    const existing = await downloadModel.findOne({ userId, movieId });
     if (existing) {
      return res.json({ message: "Already downloaded" });
    }

    const download =  await downloadModel.create({
      userId,
      movieId
    }); 
    
    return res.json({
      success: true,
      data: download,
      message: "Movie downloaded"
    });


  } catch (error) {
    res.status(500).json({ 
        error: error.message });
  }
};