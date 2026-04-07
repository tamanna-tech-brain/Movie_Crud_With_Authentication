import { useEffect, useState } from "react";
import {
  getMovies,
  getMoviesByCategory,
  watchMovie,
  downloadMovie,
} from "../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./movies.css";
import noImage from "../assets/no-image.jpg";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  const userId = localStorage.getItem("userId");

  // ✅ FETCH MOVIES (SAFE)
  const fetchMovies = async (pg = 1, searchText = "") => {
    try {
      setLoading(true);

      let res;

      if (categoryId) {
        res = await getMoviesByCategory(categoryId, pg, searchText);
      } else {
        res = await getMovies(pg, searchText);
      }

      const data = res.data;

      setMovies(data.data || []);
      setPage(data.page || 1);
      setNextPage(data.nextPage || null);
      setPrevPage(data.prevPage || null);

    } catch (err) {
      console.log(err);
      alert("Error fetching movies");
    } finally {
      setLoading(false);
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchMovies(1, "");
  }, [categoryId]);

  // ✅ DEBOUNCE SEARCH (NO FLUCTUATION)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(1, search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ WATCH
  const handleWatch = async (movieId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      await watchMovie(movieId, { userId });

      alert("▶ Watching...");
    } catch (err) {
      console.log(err);
      alert("Watch failed");
    }
  };

  // ✅ DOWNLOAD
  const handleDownload = async (movieId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      const res = await downloadMovie(movieId, { userId, movieId });

      alert(res.data.message || "Downloaded ✅");
    } catch (err) {
      console.log(err);
      alert("Download failed");
    }
  };

  return (
    <div className="yt-container">

      {/* NAVBAR */}
      <div className="yt-navbar">
        <h2 className="yt-logo">YouTube</h2>

        <div className="yt-links">
          <Link to="/">Home</Link>
          <Link to="/movie/create">Upload</Link>
          <Link to="/downloads">Library</Link>
          <Link to="/history">History</Link>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="yt-search"
      />

      {/* CLEAR FILTER */}
      {categoryId && (
        <button onClick={() => navigate("/")} className="yt-clear">
          ❌ Clear Category
        </button>
      )}

      {/* LOADING */}
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <div className="yt-grid">
          {movies.map((m) => (
            <div className="yt-card" key={m._id}>

              <div className="yt-thumbnail">
                <img
                  src={m.poster || noImage}
                  alt={m.title}
                  onError={(e) => (e.target.src = noImage)}
                />

                <div className="yt-hover">
                  <button onClick={() => handleWatch(m._id)}>
                    ▶ Play
                  </button>

                  <button onClick={() => handleDownload(m._id)}>
                    ⬇ Download
                  </button>
                </div>
              </div>

              <div className="yt-info">
                <h4>{m.title}</h4>

                <div className="yt-actions">
                  <Link to={`/movie/${m._id}`}>Details</Link>
                  <Link to={`/movie/update/${m._id}`}>Edit</Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="yt-pagination">
        <button
          disabled={!prevPage}
          onClick={() => fetchMovies(prevPage, search)}
        >
          ⬅ Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={!nextPage}
          onClick={() => fetchMovies(nextPage, search)}
        >
          Next ➡
        </button>
      </div>

    </div>
  );
};

export default Movies;