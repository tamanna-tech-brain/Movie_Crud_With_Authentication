import { Router } from "express";
import { downloadMovie, getDownloads } from "../controller/download.js";

const downloadRouter = Router();

// download movie
downloadRouter.post("/:movieId", downloadMovie);

// get all downloads (history + downloads UI)
downloadRouter.get("/:userId", getDownloads);

export default downloadRouter;