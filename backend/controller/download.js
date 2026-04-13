import mongoose from "mongoose";
import downloadmodel from "../models/downloads.js";
import { getPagination } from "../utils/pagination.js";
import { getSearchMatch } from "../utils/search.js";

export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id;

    const newDownload = await downloadmodel.create({
      userId,
      movieId
    });

    res.json({
      success: true,
      message: "Downloaded successfully",
      data: newDownload
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getDownloads = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { search = "" } = req.query;
    const userId = req.user.id;

    const searchMatch = getSearchMatch(search, "movieId.title");

    const downloads = await downloadmodel.aggregate([
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

    const total = await downloadmodel.countDocuments({ userId });

    res.json({
      success: true,
      data: downloads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.log("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};