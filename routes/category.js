import { Router } from "express";
import { validate } from "../middleware/validate.js";
import *as categorycontroller from "../controller/category.js"
import { categorySchema } from "../validators/categoryvalidator.js"
const categoryRouter = Router();

categoryRouter.post("/create", validate(categorySchema), categorycontroller.createCategory)
categoryRouter.get("/get", categorycontroller.getCategory)
categoryRouter.get("/get/:id", categorycontroller.getCategoryById)
categoryRouter.put("/update/:id", categorycontroller.updateCategoryById)
categoryRouter.delete("/delete/:id", categorycontroller.deleteCategoryById)
export default categoryRouter;