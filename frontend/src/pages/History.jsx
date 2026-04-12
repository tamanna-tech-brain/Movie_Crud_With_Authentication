import { useEffect, useState } from "react";
import { getHistory } from "../api/api";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image.jpg";
import { paginate } from "../utils";

const History = () => {
  const [allHistory, setAllHistory] = useState([]); // full data
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 2;

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      setAllHistory(res.data.data || []);
    } catch (err) {
      console.error("HISTORY ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = search
    ? allHistory.filter(h =>
        h.movieId?.title?.toLowerCase().includes(search.toLowerCase())
      )
    : allHistory;

  const {
    data: paginatedHistory,
    nextPage,
    prevPage,
    totalPages
  } = paginate(filteredHistory, page, limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">🎥 Watch History</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search history..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500"
      />

      {/* LOADING */}
      {loading ? (
        <h3 className="text-center text-lg">Loading...</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {paginatedHistory.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">
              No history found
            </p>
          ) : (
            paginatedHistory.map((h) => (
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

                  {/* VIEW */}
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

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          disabled={!prevPage}
          onClick={() => setPage(prevPage)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-lg font-semibold text-red-400">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={!nextPage}
          onClick={() => setPage(nextPage)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>
    </div>
  );
};

export default History;