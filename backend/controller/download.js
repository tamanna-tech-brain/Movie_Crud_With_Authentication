import mongoose from "mongoose";
import downloadmodel from "../models/downloads.js";

// ================= DOWNLOAD MOVIE =================
export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId } = req.body;

    const newDownload = new downloadmodel({
      userId: new mongoose.Types.ObjectId(userId),
      movieId: new mongoose.Types.ObjectId(movieId)
    });

    await newDownload.save();

    res.json({
      success: true,
      message: "Downloaded successfully"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDownloads = async (req, res) => {
  try {
    const { userId } = req.params;
    let { page = 1, limit = 2, search = "" } = req.query;

    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    const pipeline = [
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
          as: "movieId" // ✅ IMPORTANT
        }
      },
      { $unwind: "$movieId" }
    ];

    if (search) {
      pipeline.push({
        $match: {
          "movieId.title": { $regex: search, $options: "i" }
        }
      });
    }

    const totalData = await downloadmodel.aggregate([
      ...pipeline,
      { $count: "total" }
    ]);

    const total = totalData[0]?.total || 0;

    const data = await downloadmodel.aggregate([
      ...pipeline,
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    res.json({
      success: true,
      data,
      page,
      totalPages: Math.ceil(total / limit),
      nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      total
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};