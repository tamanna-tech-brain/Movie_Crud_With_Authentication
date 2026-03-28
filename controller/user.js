import usermodel from "../models/user.js";

export async function getProfileById(req, res) {
  try {
    const { id } = req.params;
    const user = await usermodel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(201).json({
      success: true,
      data: user,
      message: "User found"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function updateProfileById(req, res) {
  try {
    const { id } = req.params;
    const updateUser = await usermodel.findByIdAndUpdate(id, req.body, {new:true});
     if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(201).json({
      success: true,
      data: updateUser,
      message: "User updated"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

