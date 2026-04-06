import mongoose from "mongoose";
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
     const {
      page= 1,
      limit= 2,
      search ="",
     } = req.query;
     const skip = (page - 1) * limit;

    const history = await historymodel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movieId"
        }
      },
      {
        $unwind: "$movieId"},
       {
        $match: {
          "movieId.title": { $regex: search, $options: "i" }
        }
      }, 

      { $skip: skip },
      { $limit: Number(limit) }
    ]);
     const totalHistory = await historymodel.countDocuments({
  userId: new mongoose.Types.ObjectId(userId)
});

    return res.json({
      success: true,
      data: history,
      page: Number(page),
      totalPages: Math.ceil(totalHistory / limit),
      nextPage: page < Math.ceil(totalHistory / limit) ? Number(page + 1) : null,
      prevPage: page > 1 ? Number(page - 1) : null,
      totalHistory
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};