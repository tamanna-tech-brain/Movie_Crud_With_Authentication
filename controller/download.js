import downloadmodel from "../models/downloads.js"
import moviemodel from "../models/movie.js";
export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;


    const movie = await moviemodel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  
    const existing = await downloadmodel.findOne({ userId, movieId });
     if (existing) {
      return res.json({ message: "Already downloaded" });
    }

    const download =  await downloadmodel.create({
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