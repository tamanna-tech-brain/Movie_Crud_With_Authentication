import { Router } from "express";
import * as castController from "../controller/cast.js";
import { validate } from "../middleware/validate.js";
import { castSchema, updateCastSchema } from "../validators/castValidators.js";

const castRouter = Router();

castRouter.post("/create", validate(castSchema), castController.createCast);
castRouter.get("/get", castController.getCasts);
castRouter.get("/get/:id", castController.getCastById);
castRouter.put("/update/:id", validate(updateCastSchema), castController.updateCastById);
castRouter.delete("/delete/:id", castController.deleteCastById);

export default castRouter;