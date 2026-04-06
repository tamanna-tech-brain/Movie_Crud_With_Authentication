import { useEffect, useState } from "react";
import { getUserDownloads } from "../api/api";
import noImage from "../assets/no-image.jpg";
import "./download.css";

const Download = () => {
  const [downloads, setDownloads] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchDownloads = async (pg = 1, searchText = "") => {
    if (!userId) return;

    try {
      const res = await getUserDownloads(userId, pg, searchText);

      const data = res.data;

      setDownloads(data.data || []);
      setPage(data.page || 1);
      setNextPage(data.nextPage || null);
      setPrevPage(data.prevPage || null);

    } catch (err) {
      console.error("Download error:", err);
      alert("Error loading downloads");
    }
  };

  useEffect(() => {
    fetchDownloads(1, "");
  }, []);

  return (
    <div className="download-container">
      <h2>📥 My Downloads</h2>

      <input
        placeholder="Search downloads..."
        value={search}
        onChange={(e) => {
          const val = e.target.value;
          setSearch(val);
          fetchDownloads(1, val);
        }}
      />

      <div className="download-grid">
        {downloads.map((d) => (
  <div key={d._id} className="download-card">
    <img
      src={d.movie?.poster || noImage}   // ✅ FIX
      alt={d.movie?.title}
      onError={(e) => (e.target.src = noImage)}
    />
    <h4>{d.movie?.title}</h4>           // ✅ FIX
  </div>
))}
      </div>

      <div>
        <button disabled={!prevPage} onClick={() => fetchDownloads(prevPage, search)}>
          Prev
        </button>

        <span>{page}</span>

        <button disabled={!nextPage} onClick={() => fetchDownloads(nextPage, search)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Download;