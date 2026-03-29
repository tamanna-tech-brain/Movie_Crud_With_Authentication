import { Router } from "express";
import *as downloadcontroller from "../controller/download.js"
import { validate } from "../middleware/validate.js";
import { downloadSchema } from "../validators/downloadValidators.js";
const downloadRouter = Router();

downloadRouter.post("/download/:movieId", validate(downloadSchema), downloadcontroller.downloadMovie)
export default downloadRouter;