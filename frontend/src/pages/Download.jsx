import { useEffect, useState } from "react";
import { getDownloads } from "../api/api";
import noImage from "../assets/no-image.jpg";
import { Link } from "react-router-dom";

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchDownloads = async (pg = 1, searchText = "") => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await getDownloads(userId, pg, searchText);
      const data = res.data;

      setDownloads(data.data || []);
      setPage(data.page);
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (userId) {
    fetchDownloads(1, search);
  }
}, [search, userId]);

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
          const value = e.target.value;
          setSearch(value);
          fetchDownloads(1, value);
        }}
        className="w-full mb-6 p-3 bg-gray-800 rounded-lg outline-none"
      />

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* GRID (CATEGORY STYLE) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {downloads.map((d) => (
              <div
                key={d._id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition"
              >
                {/* IMAGE */}
                <div className="relative group">
                  <img
                    src={d.movieId?.poster || noImage}
                    alt={d.movieId?.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Link
                    to={d.movieId?._id ? `/movie/${d.movieId._id}` : "#"}
                      className="bg-red-600 px-4 py-2 rounded"
                    >
                      View
                    </Link>
                  </div>
                </div>

                {/* INFO */}
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">
                    {d.movieId?.title || "No Movie"}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {downloads.length === 0 && (
            <p className="text-center mt-10 text-gray-400">
              No downloads found
            </p>
          )}
        </>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={!prevPage}
          onClick={() => fetchDownloads(prevPage, search)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>

         <span className="text-sm bg-gray-800 px-3 py-1 rounded">
  Page {page}
</span>

        <button
          disabled={!nextPage}
          onClick={() => fetchDownloads(nextPage, search)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Downloads;