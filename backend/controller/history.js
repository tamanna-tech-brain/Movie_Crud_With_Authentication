import mongoose from "mongoose";
import historymodel from "../models/history.js";

export const watchMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;

    console.log("WATCH API HIT:", movieId, userId);

    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    const history = await historymodel.create({
  userId: new mongoose.Types.ObjectId(userId),
  movieId: new mongoose.Types.ObjectId(movieId)
});

    res.json({
      success: true,
      data: history
    });

  } catch (err) {
    console.error("WATCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    let { page = 1, limit = 2, search = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    // ✅ GET DATA WITH POPULATE
    const allHistory = await historymodel
      .find({ userId })
      .populate("movieId")
      .sort({ createdAt: -1 });

    // ✅ SEARCH
    const filtered = search
      ? allHistory.filter(h =>
          h.movieId?.title?.toLowerCase().includes(search.toLowerCase())
        )
      : allHistory;

    const total = filtered.length;

    const paginated = filtered.slice(skip, skip + limit);

    res.json({
      success: true,
      data: paginated,
      page,
      totalPages: Math.ceil(total / limit),
      nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      totalHistory: total
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};