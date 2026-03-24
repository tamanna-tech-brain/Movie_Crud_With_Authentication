import express from "express";
import authRouter from "./routes/auth.js";
import downloadRouter from "./routes/download.js";
import categoryRouter from "./routes/category.js";
import historyRouter from "./routes/history.js";
import movieRouter from "./routes/movie.js";
import userRouter from "./routes/user.js";
import castRouter from "./routes/cast.js";

import cookieParser from "cookie-parser";
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/download", downloadRouter);
app.use("/api/movie", movieRouter);
app.use("/api/history", historyRouter);
app.use("/api/cast", castRouter);
export default app;