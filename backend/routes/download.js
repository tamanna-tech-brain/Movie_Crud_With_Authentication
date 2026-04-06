import { Router } from "express";
import {
  downloadMovie,
  getUserDownloads
} from "../controller/download.js";

const downloadRouter = Router();

downloadRouter.post("/download/:movieId", downloadMovie);

downloadRouter.get("/:userId", getUserDownloads);

export default downloadRouter;