import { Router } from "express";
import *as usercontroller from "../controller/user.js"
const userRouter = Router();

userRouter.get("/get/:id", usercontroller.getProfileById)
userRouter.put("/update/:id", usercontroller.updateProfileById)
export default userRouter;