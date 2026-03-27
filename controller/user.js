import userModel from "../Models/user.js";

export async function getProfileById(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("not found");
    }
    
    res.status(201).json({
      success: true,
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
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {new:true});
    if (!updateUser) {
      throw new Error("not found user id");
    }
    
    res.status(201).json({
      success: true,
      message: "User updated"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

