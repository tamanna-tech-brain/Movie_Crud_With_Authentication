import { Router } from "express";
import * as castController from "../controller/cast.js";

const castRouter = Router();

castRouter.post("/create", castController.createCast);
castRouter.get("/get", castController.getCasts);
castRouter.get("/get/:id", castController.getCastById);
castRouter.put("/update/:id", castController.updateCastById);
castRouter.delete("/delete/:id", castController.deleteCastById);

export default castRouter;