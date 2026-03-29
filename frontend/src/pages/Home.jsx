import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../api/movie";
import "./home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await getMovies(page);
      setMovies(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="home">
      <h1 className="title">🎬 Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            className="card"
            key={movie._id}
            onClick={() => navigate(`/movie/${movie._id}`)}
          >
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}