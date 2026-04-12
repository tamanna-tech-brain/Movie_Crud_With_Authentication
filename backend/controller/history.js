import mongoose from "mongoose";
import historymodel from "../models/history.js";

export const watchMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id; // ✅ FIRST define

    console.log("WATCH API HIT:", movieId, userId);

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
    const userId = req.user.id; // ✅ IMPORTANT

    const history = await historymodel
      .find({ userId })
      .populate("movieId");

    res.json({ success: true, data: history });

  } catch (err) {
    console.log("HISTORY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};