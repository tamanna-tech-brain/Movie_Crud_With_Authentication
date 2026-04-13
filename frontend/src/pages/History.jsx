import { useEffect, useState } from "react";
import { getHistory } from "../api/api";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image.jpg";

const History = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(2);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await getHistory({ page, limit, search });

      setHistory(res.data.data || []);
      setPagination(res.data.pagination || {});

    } catch (err) {
      console.error("HISTORY ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">🎥 Watch History</h2>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search history..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700"
      />

      {/* LOADING */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {history.map((h) => (
              <div
                key={h._id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow hover:scale-105 transition"
              >
                <img
                  src={h.movieId?.poster || noImage}
                  className="w-full h-44 object-cover"
                />

                <div className="p-3">
                  <h4 className="font-semibold truncate">
                    {h.movieId?.title}
                  </h4>

                  <Link
                    to={`/movie/${h.movieId?._id}`}
                    className="block mt-2 text-center bg-red-600 py-1 rounded"
                  >
                    View 🎬
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {history.length === 0 && (
            <p className="text-center mt-10 text-gray-400">
              No history found
            </p>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center gap-4 mt-8">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>

            <span>
              Page {pagination.page} / {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
            >
              Next ➡
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default History;