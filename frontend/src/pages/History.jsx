import { useEffect, useState } from "react";
import { getHistory } from "../api/api";
import noImage from "../assets/no-image.jpg";
import "./history.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchHistory = async (pg = 1, searchText = "") => {
    if (!userId) return;

    try {
      const res = await getHistory(userId, pg, searchText);

      const data = res.data;

      setHistory(data.data || []);
      setPage(data.page || 1);
      setNextPage(data.nextPage || null);
      setPrevPage(data.prevPage || null);

    } catch (err) {
      console.error("History error:", err);
      alert("Error fetching history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="history-container">

      <h2 className="history-title">🕒 Watch History</h2>

      {/* 🔍 SEARCH */}
      <input
        className="history-search"
        placeholder="Search history..."
        value={search}
        onChange={(e) => {
          const val = e.target.value;
          setSearch(val);
          fetchHistory(1, val);
        }}
      />

      {/* GRID */}
      <div className="history-grid">
        {history.map((h) => (
          <div className="history-card" key={h._id}>

            <div className="history-img">
              <img
                src={h.movieId?.poster || noImage}
                alt={h.movieId?.title}
              />

              {/* HOVER */}
              <div className="history-hover">
                <button>▶ Watch Again</button>
              </div>
            </div>

            <div className="history-info">
              <h4>{h.movieId?.title}</h4>
            </div>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="history-pagination">
        <button
          disabled={!prevPage}
          onClick={() => fetchHistory(prevPage, search)}
        >
          ⬅ Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={!nextPage}
          onClick={() => fetchHistory(nextPage, search)}
        >
          Next ➡
        </button>
      </div>

    </div>
  );
};

export default History;