import { Router } from "express";
import *as moviecontroller from "../controller/movie.js"
const movieRouter = Router();

movieRouter.post("/create", moviecontroller.createMovie)
movieRouter.get("/get", moviecontroller.getMovies)
movieRouter.get("/get/:id", moviecontroller.getMoviesById)
movieRouter.put("/update/:id", moviecontroller.updateMovieById)
movieRouter.delete("/delete/:id", moviecontroller.deleteMovieById)
export default movieRouter;