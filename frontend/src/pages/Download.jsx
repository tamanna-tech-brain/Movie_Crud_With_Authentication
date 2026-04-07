import { useEffect, useState } from "react";
import { getUserDownloads } from "../api/api";
import noImage from "../assets/no-image.jpg";
import "./download.css";

const Download = () => {
  const [downloads, setDownloads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchDownloads = async () => {
    if (!userId) return;

    try {
      const res = await getUserDownloads(userId, page, search);
      const data = res.data;

      setDownloads(data.data || []);
      setTotalPages(data.totalPages || 1);

      // ✅ AUTO FIX PAGE IF INVALID
      if (page > data.totalPages) {
        setPage(data.totalPages);
      }

    } catch (err) {
      console.error("Download error:", err);
      alert("Error loading downloads");
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, [page, search]);

  return (
    <div className="download-container">
      <h2>📥 My Downloads</h2>

      {/* SEARCH */}
      <input
        placeholder="Search downloads..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // ✅ reset page
        }}
      />

      {/* GRID */}
      <div className="download-grid">
        {downloads.length === 0 ? (
          <p>No downloads found</p>
        ) : (
          downloads.map((d) => (
            <div key={d._id} className="download-card">
              <img
                src={d.movie?.poster || noImage}
                alt={d.movie?.title}
                onError={(e) => (e.target.src = noImage)}
              />
              <h4>{d.movie?.title || "No title"}</h4>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="download-pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ⬅ Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Download;