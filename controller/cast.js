import castmodel from "../models/cast.js"

export async function createCast(req, res) {
  try {
    const { name, age, bio, image } = req.body;

    if (!name) {
      throw new Error("Name is required");
    }

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
    const casts = await castmodel.find();

    res.json({
      success: true,
      data: casts
    });

  } catch (error) {
    res.status(400).json({
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
      throw new Error("Cast not found");
    }

    res.json({
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

export async function updateCastById(req, res) {
  try {
    const { id } = req.params;

    const updated = await castmodel.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
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

    await castmodel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Cast deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}