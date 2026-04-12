import { useEffect, useState } from "react";
import {
  getMovies,
  watchMovie,
  downloadMovie,
  deleteMovie
} from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import noImage from "../assets/no-image.jpg";
import { paginate } from "../utils";

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]); // full data
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 2;
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  const fetchMovies = async () => {
    try {
      setLoading(true);

      let res;
      if (categoryId) {
        res = await getMoviesByCategory(categoryId); // ❗ no page/search
      } else {
        res = await getMovies();
      }

      setAllMovies(res.data.data || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchMovies();
  }, [categoryId]);

  const filteredMovies = searchText
    ? allMovies.filter(m =>
        m.title?.toLowerCase().includes(searchText.toLowerCase())
      )
    : allMovies;

  const {
    data: paginatedMovies,
    nextPage,
    prevPage,
    totalPages
  } = paginate(filteredMovies, page, limit);

  // 🎬 Watch
  const handleWatch = async (movieId) => {
    try {
      const res = await watchMovie(movieId);
      alert(res.data.message || "Watched successfully 🎬");
    } catch (err) {
      alert(err.response?.data?.message || "Watch failed");
    }
  };

  // ⬇ Download
  const handleDownload = async (movieId) => {
    try {
      const res = await downloadMovie(movieId);
      alert(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg?.includes("duplicate")) {
        alert("Already downloaded ✅");
      } else {
        alert(msg || "Download failed");
      }
    }
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    await deleteMovie(id);
    fetchMovies();
  };

  // 🔐 Not logged in
 const token = localStorage.getItem("token");

if (!token) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
        <h1 className="text-4xl font-bold mb-6">🎬 Movie App</h1>
        <p className="text-gray-400 mb-8">
          Please login or register to continue
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600"
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
          <button
            onClick={() => navigate("/movie/create")}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            ➕ Create Movie
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search movies..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setPage(1); // ✅ important
        }}
        className="w-full mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* GRID */}
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedMovies.map((m) => (
            <div
              key={m._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
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

      {/* EMPTY */}
      {!loading && paginatedMovies.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          No movies found
        </p>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={!prevPage}
          onClick={() => setPage(prevPage)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={!nextPage}
          onClick={() => setPage(nextPage)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Movies;