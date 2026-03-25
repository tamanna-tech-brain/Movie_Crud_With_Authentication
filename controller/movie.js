import movieModel from "../Models/movie.js";

export async function createMovie(req, res) {
  try {
    const { userId, title, description, categoryId, language, duration, cast, releaseYear} = req.body;
    title = title.toLowerCase();
    
    if (!userId || !title || !description|| !categoryId  || !language || !duration || !cast || !releaseYear) {
      throw new Error("requried fields missings");
    }
    const movie = await movieModel.create({
        userId,
        title,
        description,
        categoryId,
        language,
        duration,
        cast,
        releaseYear
      });
    
    res.status(201).json({
      success: true,
      data: movie,
      message: "Address created successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function getMovies(req, res) {
  try {
    const movies = await movieModel.find();
    if (!movies) {
      throw new Error("not found");
    }
    
    res.status(201).json({
      success: true,
      message: "Movies found successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function getMoviesById(req, res) {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);
    if (!movie) {
      throw new Error("not found ");
    }
    
    res.status(201).json({
      success: true,
      message: "Movie is found successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function updateMovieById(req, res) {
  try {
    const { id } = req.params;
    const updateMovie = await movieModel.findByIdAndUpdate(id, req.body, {new:true});
    if (!updateMovie) {
      throw new Error("not found movie id");
    }
    
    res.status(201).json({
      success: true,
      message: " updated successsfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

export async function deleteMovieById(req, res) {
  try {
    const { id } = req.params;
    const movieDelete = await movieModel.findByIdAndDelete(id);
    if (!movieDelete) {
      throw new Error("movie id not found" );
    }
    
    res.status(201).json({
      success: true,
      message: "Deleted successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

