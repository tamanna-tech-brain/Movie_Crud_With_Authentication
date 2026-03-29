import { useEffect, useState, useContext } from "react";
import { getMovies } from "../api/movie";
import { useNavigate } from "react-router-dom";
import { downloadMovie } from "../api/download";
import { watchMovie } from "../api/history";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchMovies = async () => {
    const res = await getMovies(page);
    setMovies(res.data.data);
  };
  

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleDownload = async (id) => {
    if (!user) return alert("Login first");
    await downloadMovie(id, user._id);
    alert("Downloaded");
  };

  const handleWatch = async (id) => {
    if (!user) return alert("Login first");
    await watchMovie(id, user._id);
    navigate(`/movie/${id}`);
  };

  return (
    <div className="home">
      <h1>🎬 Movies</h1>

      {movies.map((m) => (
        <div key={m._id} className="card">
          <h3>{m.title}</h3>
          <p>{m.description}</p>

          <button onClick={() => navigate(`/movie/${m._id}`)}>
            View
          </button>

          <button onClick={() => handleDownload(m._id)}>
            Download
          </button>

          <button onClick={() => handleWatch(m._id)}>
            Watch
          </button>
          <button onClick={() => addFavorite(m._id, user._id)}>
  ❤️ Favorite
</button>
        </div>
      ))}
    </div>
  );
}