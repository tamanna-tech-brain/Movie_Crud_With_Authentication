import { useEffect, useState } from "react";
import {
  getMovies,
  getMoviesByCategory,
  watchMovie,
  downloadMovie,
  deleteMovie
} from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import noImage from "../assets/no-image.jpg";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  // ✅ FETCH MOVIES
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
      setPage(pg);
      setHasMore(data.data && data.data.length > 0);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMovies(1, "");
    }
  }, [categoryId, userId]);

  // ✅ WATCH
 const handleWatch = async (movieId) => {
  try {
    console.log("CLICKED WATCH:", movieId);

    const res = await watchMovie(movieId, { userId });

    console.log("FULL RESPONSE:", res);
    console.log("WATCH SUCCESS DATA:", res.data);

    alert(res.data.message || "Watched successfully 🎬");

  } catch (err) {
    console.error("WATCH ERROR FULL:", err);
    console.error("WATCH ERROR RESPONSE:", err.response?.data);

    alert(err.response?.data?.message || "Watch failed");
  }
};

  // ✅ DOWNLOAD
const handleDownload = async (movieId) => {
  try {
    const res = await downloadMovie(movieId, { userId });

    alert(res.data.message);

  } catch (err) {
    const msg = err.response?.data?.message;

    if (msg?.includes("duplicate")) {
      alert("Already downloaded ✅");
    } else {
      alert(msg || "Download failed");
    }

    console.error("DOWNLOAD ERROR:", err.response?.data);
  }
};

  // ✅ DELETE
  const handleDelete = async (id) => {
    await deleteMovie(id);
    fetchMovies(page, search);
  };

  // ✅ AUTH UI (NO HOOK BREAK)
  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl font-bold mb-6">🎬 Movie App</h1>
        <p className="text-gray-400 mb-8">
          Please login or register to continue
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎬 Movies</h2>

        <div className="flex gap-3">
          {/* ✅ CREATE MOVIE (FOR ALL USERS) */}
          <button
            onClick={() => navigate("/movie/create")}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Create Movie
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search movies..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchMovies(1, e.target.value);
        }}
        className="w-full mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* GRID */}
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((m) => (
            <div
              key={m._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={m.poster || noImage}
                onError={(e) => (e.target.src = noImage)}
                className="w-full h-44 object-cover"
              />

              <div className="p-3">
                <h4 className="font-semibold truncate">{m.title}</h4>

                <div className="flex justify-between mt-3 text-lg">
                  <button onClick={() => handleWatch(m._id)}>▶</button>
                  <button onClick={() => handleDownload(m._id)}>⬇</button>
                  <button onClick={() => handleDelete(m._id)}>🗑</button>
                  <button onClick={() => navigate(`/movie/update/${m._id}`)}>
    ✏️
  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => fetchMovies(page - 1, search)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={!hasMore}
          onClick={() => fetchMovies(page + 1, search)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
      
    </div>
  );
};

export default Movies;