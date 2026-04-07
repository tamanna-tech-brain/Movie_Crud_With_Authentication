import mongoose from "mongoose";
import downloadmodel from "../models/downloads.js";
import moviemodel from "../models/movie.js";

// ================= DOWNLOAD MOVIE =================
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

    // ✅ CHECK EXISTING
    const existing = await downloadmodel.findOne({ userId, movieId });
    if (existing) {
      return res.json({ message: "Already downloaded ✅" });
    }

    const download = await downloadmodel.create({
      userId,
      movieId,
    });

    return res.status(201).json({
      success: true,
      message: "Movie downloaded ✅",
      data: download,
    });

  } catch (error) {

    // ✅ HANDLE DUPLICATE ERROR SAFELY
    if (error.code === 11000) {
      return res.json({ message: "Already downloaded ✅" });
    }

    console.log("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= GET USER DOWNLOADS =================
export const getUserDownloads = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = 6;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const pipeline = [
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
    ];

    // ✅ COUNT
    const totalData = await downloadmodel.aggregate([
      ...pipeline,
      { $count: "total" },
    ]);

    const total = totalData.length ? totalData[0].total : 0;

    // ✅ FIX: always minimum 1 page
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    // ✅ SAFETY: if page > totalPages → reset
    const safePage = page > totalPages ? totalPages : page;
    const safeSkip = (safePage - 1) * limit;

    const downloads = await downloadmodel.aggregate([
      ...pipeline,
      { $skip: safeSkip },
      { $limit: limit },
    ]);

    res.json({
      success: true,
      data: downloads,
      page: safePage,
      totalPages,
      nextPage: safePage < totalPages ? safePage + 1 : null,
      prevPage: safePage > 1 ? safePage - 1 : null,
    });

  } catch (error) {
    console.log("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};