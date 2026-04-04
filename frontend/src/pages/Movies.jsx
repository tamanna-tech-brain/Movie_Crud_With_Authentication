import { useEffect, useState } from "react";
import { getMovies, deleteMovie, watchMovie, downloadMovie } from "../api/api";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchMovies = async (pg = 1) => {
    const res = await getMovies(pg);
    setMovies(res.data.data);
    setPage(res.data.page);
    setNextPage(res.data.nextPage);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    alert("Deleted");
    fetchMovies(page);
  };

  const handleWatch = async (movieId) => {
  if (!userId) {
    alert("Please login first");
    return;
  }

  try {
    const res = await watchMovie(movieId, {
  userId,
  movieId  
});

    console.log("WATCH RESPONSE:", res.data);

    alert("Added to history");

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  const handleDownload = async (movieId) => {
    try {
      await downloadMovie(movieId, { userId });
      alert("Downloaded");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Movies</h2>

      <Link to="/movie/create">Add Movie</Link>

      {movies.map((m) => (
        <div key={m._id} style={{ border: "1px solid", margin: "10px" }}>
          <h3>{m.title}</h3>

          <Link to={`/movie/${m._id}`}>View</Link> |{" "}
          <Link to={`/movie/update/${m._id}`}>Edit</Link> |{" "}
          <button onClick={() => handleDelete(m._id)}>Delete</button>

          <br />

          <button onClick={() => handleWatch(m._id)}>Watch</button>

          <button onClick={() => handleDownload(m._id)}>
            Download
          </button>
        </div>
      ))}

      {nextPage && (
        <button onClick={() => fetchMovies(nextPage)}>Next</button>
      )}
    </div>
  );
};

export default Movies;