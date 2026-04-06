import castmodel from "../models/cast.js"

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
    const page = parseInt(req.query.page) || 1;
    const limit = 2;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const query = {
      name: { $regex: search, $options: "i" }
    };

    const totalcasts = await castmodel.countDocuments(query);
    const totalPages = Math.ceil(totalcasts / limit);

    const casts = await castmodel
      .find(query)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: casts,
      page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      totalPages,
      totalcasts
    });

  } catch (error) {
    console.log("CAST ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
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