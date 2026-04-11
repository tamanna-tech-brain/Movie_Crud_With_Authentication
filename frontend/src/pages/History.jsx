import { useEffect, useState } from "react";
import { getHistory } from "../api/api";
import { Link } from "react-router-dom"; // ✅ FIX (IMPORTANT)
import noImage from "../assets/no-image.jpg";

const History = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchHistory = async (pg = 1, searchText = "") => {
    try {
      setLoading(true);

      const res = await getHistory(userId, pg, searchText);
      const data = res.data;

      console.log("USER ID:", userId);
      console.log("🔥 HISTORY RESPONSE:", data);

      setHistory(data.data || []);
      setPage(data.page);
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);

    } catch (err) {
      console.error("HISTORY ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchHistory(1, search);
    }
  }, [search, userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">🎥 Watch History</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search history..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
      />

      {/* LOADING */}
      {loading ? (
        <h3 className="text-center text-lg">Loading...</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {history.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">
              No history found
            </p>
          ) : (
            history.map((h) => (
              <div
                key={h._id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
              >

                {/* IMAGE */}
                <img
                  src={h.movieId?.poster || noImage}
                  alt={h.movieId?.title}
                  className="w-full h-56 object-cover"
                />

                {/* INFO */}
                <div className="p-3">
                  <h4 className="text-lg font-semibold truncate">
                    {h.movieId?.title || "Unknown Movie"}
                  </h4>

                  <p className="text-sm text-gray-400 mt-1">
                    Watched 🎬
                  </p>

                  {/* VIEW BUTTON */}
                  <Link
                    to={`/movie/${h.movieId?._id}`}
                    className="inline-block mt-2 text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    View
                  </Link>
                </div>

              </div>
            ))
          )}

        </div>
      )}
      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          disabled={!prevPage}
          onClick={() => fetchHistory(prevPage, search)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-lg font-semibold text-red-400">
          Page {page}
        </span>

        <button
          disabled={!nextPage}
          onClick={() => fetchHistory(nextPage, search)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>
    </div>
  );
};

export default History;