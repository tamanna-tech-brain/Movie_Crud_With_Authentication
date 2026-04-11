import { Router } from "express";
import { downloadMovie, getDownloads } from "../controller/download.js";

const downloadRouter = Router();

downloadRouter.post("/:movieId", downloadMovie);

downloadRouter.get("/:userId", getDownloads);

export default downloadRouter;