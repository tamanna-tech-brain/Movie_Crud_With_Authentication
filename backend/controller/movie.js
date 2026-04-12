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
    
    res.status(200).json({
      success: true,
      data: movie,
      message: "Movie created successfully"
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
    const movies = await moviemodel.aggregate([
      
      {
        $lookup: {
          from: "categories", // collection name
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },

      {
        $lookup: {
          from: "casts",
          localField: "cast",
          foreignField: "_id",
          as: "cast"
        }
      },

      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      }

    ]);

    res.status(200).json({
      success: true,
      data: movies
    });

  } catch (error) {
    console.error("MOVIE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export async function getMoviesById(req, res) {
  try {
    const { id } = req.params;
    const movie = await moviemodel.findById(id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }
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
    if (!updateMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }
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
    if (!movieDelete) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }
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

