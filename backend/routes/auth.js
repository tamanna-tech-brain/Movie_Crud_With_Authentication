import { Router } from "express";
import { validate } from "../middleware/validate.js";
import *as authcontroller from "../controller/auth.js"
import { registerSchema } from "../validators/userValidator.js";
import { loginSchema } from "../validators/userValidator.js";
const authRouter = Router();

authRouter.post("/register",validate(registerSchema), authcontroller.register)
authRouter.post("/login", validate(loginSchema), authcontroller.login)
export default authRouter;