import moviemodel from "../models/movie.js";

export async function createMovie(req, res) {
  try {
    const { userId, title, description, categoryId, language, duration, cast, releaseYear} = req.body;
    const normalizedTitle = title.toLowerCase();
    const movie = await moviemodel.create({
        userId,
        title:normalizedTitle,
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
    const movies = await moviemodel.find();
    res.status(200).json({
      success: true,
      data: movies,
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
    const movie = await moviemodel.findById(id);
    res.status(200).json({
      success: true,
      data: movie,
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
    const updateMovie = await moviemodel.findByIdAndUpdate(id, req.body, {new:true});
    res.status(201).json({
      success: true,
      data: updateMovie,
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
    const movieDelete = await moviemodel.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      data : movieDelete,
      message: "Deleted successfully"
    });
    

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

