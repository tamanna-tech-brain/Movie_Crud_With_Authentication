import category from "../Models/category"

export async function createMovie(req, res) {
  try {
    const { name, description} = req.params;
    const movie = await movie.create(
        name,
        description,
        );
    if (!name|| !description) {
      throw new Error("not found category");
    }
    
    res.status(201).json({
      success: true,
      message: " category created successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function getCategory(req, res) {
  try {
    const categories = await category.find();
    if (!categories) {
      throw new Error("not found");
    }
    
    res.status(201).json({
      success: true,
      message: "Categories found successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const category= await category.findById(id);
    if (!category) {
      throw new Error("not found ");
    }
    
    res.status(201).json({
      success: true,
      message: "category found successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function updateCategoryById(req, res) {
  try {
    const { id } = req.params;
    const updateCategory = await category.findByIdAndUpdate(id, req.body, {new:true});
    if (!updateCategory) {
      throw new Error("not found category id");
    }
    
    res.status(201).json({
      success: true,
      message: " updated successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function deleteCategoryById(req, res) {
  try {
    const { id } = req.params;
    const categoryDelete = await category.findByIdAndDelete(id);
    if (!categoryDelete) {
      throw new Error("movie id not found" );
    }
    
    res.status(201).json({
      success: true,
      message: "Deleted successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}