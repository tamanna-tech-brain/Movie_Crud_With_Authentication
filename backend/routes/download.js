import { Router } from "express";
import { downloadMovie, getDownloads } from "../controller/download.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const downloadRouter = Router();

downloadRouter.post("/:movieId", authMiddleware, downloadMovie);

downloadRouter.get("/", authMiddleware,  getDownloads);

export default downloadRouter;