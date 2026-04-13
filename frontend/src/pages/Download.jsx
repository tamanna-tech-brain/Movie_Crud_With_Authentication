import { useEffect, useState } from "react";
import { getDownloads } from "../api/api";
import noImage from "../assets/no-image.jpg";
import { Link } from "react-router-dom";

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  const fetchDownloads = async () => {
    try {
      setLoading(true);

      const res = await getDownloads({
        page,
        limit,
        search
      });

      setDownloads(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, [page, search]);

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">⬇ Downloads</h2>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search downloads..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full mb-6 p-3 bg-gray-800 rounded-lg outline-none"
      />

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {downloads.length === 0 ? (
              <p className="col-span-full text-center text-gray-400">
                No downloads found
              </p>
            ) : (
              downloads.map((d) => (
                <div
                  key={d._id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition"
                >
                  <div className="relative group">
                    <img
                      src={d.movieId?.poster || noImage}
                      alt={d.movieId?.title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Link
                        to={`/movie/${d.movieId?._id}`}
                        className="bg-red-600 px-4 py-2 rounded"
                      >
                        View
                      </Link>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate">
                      {d.movieId?.title || "No Movie"}
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        <span className="text-sm bg-gray-800 px-3 py-1 rounded">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Downloads;