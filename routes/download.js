import { Router } from "express";
import *as downloadcontroller from "../controller/download.js"
const downloadRouter = Router();

downloadRouter.post("/download/:movieId", downloadcontroller.downloadMovie)
export default downloadRouter;