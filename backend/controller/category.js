import categorymodel from "../models/category.js"

export async function createCategory(req, res) {
  try {
    const { name, description} = req.body;
    const newCategory = await categorymodel.create({  
      name,
      description,
      });
    
    res.status(201).json({
      success: true,
      data: newCategory,
      message: " category created successfully"
    });
  }
  catch (error) {
    if (error.code === 11000) {
  return res.status(400).json({
    success: false,
    message: "Category already exists"
  });
  }
    res.status(500).json({
      success: false,
      message: error.message
    });
}
}

export async function getCategory(req, res) {
  try { 
    const page = parseInt(req.query.page) || 1;
    const limit = 2;

    const totalCategories = await categorymodel.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    const categories = await categorymodel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);


    res.status(201).json({
      success: true,
      data: categories,
      message: "Categories found successfully",
      page,
      nextPage,
      totalPages,
      totalCategories
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
    const categoryData= await categorymodel.findById(id);
    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.status(200).json({
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

    const updateCategory = await categorymodel.findByIdAndUpdate(id, req.body, {new:true});
     if (!updateCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
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
    const categoryDelete = await categorymodel.findByIdAndDelete(id);
   
    if (!categoryDelete) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
     return res.status(201).json({
      success: true,
      data : categoryDelete,
      message: "Deleted successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}