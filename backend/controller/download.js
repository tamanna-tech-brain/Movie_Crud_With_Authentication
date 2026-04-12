import mongoose from "mongoose";
import downloadmodel from "../models/downloads.js";

export const downloadMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id; 

    const newDownload = new downloadmodel({
      userId,
      movieId
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
    const userId = req.user.id; 

    const downloads = await downloadmodel
      .find({ userId })
      .populate("movieId");

    res.status(200).json({
      success: true,
      data: downloads
    });

  } catch (error) {
    console.log("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};