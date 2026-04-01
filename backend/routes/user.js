import { Router } from "express";
import *as usercontroller from "../controller/user.js"
import { validate } from "../middleware/validate.js";
import { updateUserSchema } from "../validators/userValidator.js";
import { userIdSchema } from "../validators/userValidator.js";

const userRouter = Router();


userRouter.get("/get/:id", validate(userIdSchema, "params") ,usercontroller.getProfileById)
userRouter.put("/update/:id", validate(userIdSchema, "params"), validate(updateUserSchema), usercontroller.updateProfileById)
export default userRouter