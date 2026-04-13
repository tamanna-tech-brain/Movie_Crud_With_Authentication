import { useEffect, useState } from "react";
import { getCasts, deleteCast } from "../api/api";
import { useNavigate } from "react-router-dom";

const Cast = () => {
  const [casts, setCasts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 2;
  const navigate = useNavigate();

  const fetchCasts = async () => {
    try {
      setLoading(true);

      const res = await getCasts({
        page,
        limit,
        search
      });

      setCasts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);

    } catch (err) {
      console.log(err);
      alert("Error fetching cast");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasts();
  }, [page, search]);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await deleteCast(id);
      fetchCasts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cast</h2>

        <button
          onClick={() => navigate("/cast/create")}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add Cast
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search cast..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700 outline-none"
      />

      {/* GRID */}
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {casts.map((cast) => (
            <div
              key={cast._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <img
                src={`https://source.unsplash.com/400x300/?actor,${cast.name}`}
                alt={cast.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-3">
                <h4 className="font-semibold truncate">{cast.name}</h4>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-2 mt-3">

                  <button
                    onClick={() => navigate(`/cast/${cast._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-sm py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/cast/update/${cast._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-sm py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cast._id)}
                    className="col-span-2 bg-red-600 hover:bg-red-700 text-sm py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && casts.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          No cast found
        </p>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Cast;