import { Router } from "express";
import *as categorycontroller from "../controller/category.js"
const categoryRouter = Router();

categoryRouter.post("/create", categorycontroller.createCategory)
categoryRouter.get("/get", categorycontroller.getCategory)
categoryRouter.get("/get/:id", categorycontroller.getCategoryById)
categoryRouter.put("/update/:id", categorycontroller.updateCategoryById)
categoryRouter.delete("/delete/:id", categorycontroller.deleteCategoryById)
export default categoryRouter;