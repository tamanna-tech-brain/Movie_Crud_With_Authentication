import { Router } from "express";
import *as historycontroller from "../controller/history.js"
const historyRouter = Router();

historyRouter.post("/watch/:movieId", historycontroller.watchMovie)
historyRouter.get("/get/:userId", historycontroller.getHistory)
export default historyRouter;