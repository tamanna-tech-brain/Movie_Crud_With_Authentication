import mongoose from "mongoose";
import downloadmodel from "../models/downloads.js";
import moviemodel from "../models/movie.js";

export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movieId" });
    }

    const movie = await moviemodel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const existing = await downloadmodel.findOne({ userId, movieId });
    if (existing) {
      return res.json({ message: "Already downloaded" });
    }

    const download = await downloadmodel.create({
      userId,
      movieId,
    });

    return res.status(201).json({
      success: true,
      message: "Movie downloaded",
      data: download,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserDownloads = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const downloads = await downloadmodel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },

      {
        $match: {
          "movie.title": { $regex: search, $options: "i" },
        },
      },

      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await downloadmodel.countDocuments({ userId });

    res.json({
      success: true,
      data: downloads,
      page,
      totalPages: Math.ceil(total / limit),
      nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};