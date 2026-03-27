import category from "../Models/category.js"

export async function createCategory(req, res) {
  try {
    const { name, description} = req.body;
  if (!req.body) {
  throw new Error("Request body missing");
}

if (name !== name.toLowerCase()) {
  throw new Error("Category must be lowercase");
}
    const newCategory = await category.create({  
      name,
      description,
      });
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
  if (error.code === 11000) {
  return res.status(400).json({
    success: false,
    message: "Category already exists"
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
      data: categories,
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
    const categoryData= await category.findById(id);
    if (!categoryData) {
      throw new Error("not found ");
    }
    
    res.status(201).json({
      success: true,
      data: categoryData,
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
    if (!req.body) {
  throw new Error("Request body missing");
}
    const { name, description } = req.body;    

    const updateCategory = await category.findByIdAndUpdate(id, { name, description}, {new:true});
    if (!updateCategory) {
      throw new Error("not found category id");
    }
    
    res.status(200).json({
      success: true,
      data : updateCategory,
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
      throw new Error("category id not found" );
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