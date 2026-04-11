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
    const page = parseInt(req.query.page) || 1;
    const limit = 2;
    const search = req.query.search || "";
    const category = req.query.category;

    const skip = (page - 1) * limit;

    const query = {
      title: { $regex: search, $options: "i" }
    };

    if (category) {
      query.categoryId = { $in: [category] };
    }

    const totalMovies = await moviemodel.countDocuments(query);
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await moviemodel
      .find(query)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: movies,
      page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      totalPages
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
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

