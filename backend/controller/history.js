import mongoose from "mongoose";
import historymodel from "../models/history.js";
import { getPagination } from "../utils/pagination.js";
import { getSearchMatch } from "../utils/search.js";

export const watchMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id;

    const history = await historymodel.create({
      userId,
      movieId
    });

    res.json({
      success: true,
      data: history
    });

  } catch (err) {
    console.error("WATCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


export const getHistory = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { search = "" } = req.query;
    const userId = req.user.id;

    const searchMatch = getSearchMatch(search, "movieId.title");

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

      { $unwind: "$movieId" },

      ...(searchMatch ? [{ $match: searchMatch }] : []),

      { $skip: skip },
      { $limit: limit }
    ]);

    const total = await historymodel.countDocuments({ userId });

    res.json({
      success: true,
      data: history,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    console.log("HISTORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};