import { Router } from "express";
import *as authcontroller from "../controller/auth.js"
const authRouter = Router();

authRouter.post("/register", authcontroller.register)
authRouter.get("/login", authcontroller.login)
export default authRouter;