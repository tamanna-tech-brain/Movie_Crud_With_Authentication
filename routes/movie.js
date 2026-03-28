import { Router } from "express";
import *as moviecontroller from "../controller/movie.js"
import  movieSchema, { updateMovieSchema }  from "../validators/movieValidator.js";
import { validate } from "../middleware/validate.js";
const movieRouter = Router();

movieRouter.post("/create",validate(movieSchema), moviecontroller.createMovie)
movieRouter.get("/get", moviecontroller.getMovies)
movieRouter.get("/get/:id", moviecontroller.getMoviesById)
movieRouter.put("/update/:id", validate(updateMovieSchema) , moviecontroller.updateMovieById)
movieRouter.delete("/delete/:id", moviecontroller.deleteMovieById)
export default movieRouter;