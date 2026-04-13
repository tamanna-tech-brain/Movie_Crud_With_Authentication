import castmodel from "../models/cast.js"
import { getPagination } from "../utils/pagination.js";
import { getSearchMatch } from "../utils/search.js";

export async function createCast(req, res) {
  try {
    const { name, age, bio, image } = req.body;
    const cast = await castmodel.create({
      name,
      age,
      bio,
      image
    });

    res.status(201).json({
      success: true,
      data: cast
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function getCasts(req, res) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { search = "" } = req.query;

    const matchStage = getSearchMatch(search, "name");

    const casts = await castmodel
      .find(matchStage)
      .skip(skip)
      .limit(limit);

    const total = await castmodel.countDocuments(matchStage);

    res.json({
      success: true,
      data: casts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getCastById(req, res) {
  try {
    const { id } = req.params;

    const cast = await castmodel.findById(id);
    if (!cast) {
      return res.status(404).json({
        success: false,
        message: "Cast not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: cast,
      message: "Cast found successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function updateCastById(req, res) {
  try {
    const { id } = req.params;

    const updated = await castmodel.findByIdAndUpdate(id, req.body, { new: true });
     if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Cast not found"
      });
    }
     return res.status(200).json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function deleteCastById(req, res) {
  try {
    const { id } = req.params;

    const deleted = await castmodel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cast not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: deleted,
      message: "Cast deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}