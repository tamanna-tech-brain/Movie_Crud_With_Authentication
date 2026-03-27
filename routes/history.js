import { Router } from "express";
import *as historycontroller from "../controller/history.js"
import { validate } from "../middleware/validate.js";
import { historySchema } from "../validators/historyValidator.js";
const historyRouter = Router();

historyRouter.post("/watch/:movieId", validate(historySchema), historycontroller.watchMovie)
historyRouter.get("/get/:userId", historycontroller.getHistory)
export default historyRouter;