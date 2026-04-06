import { useEffect, useState } from "react";
import { getHistory } from "../api/api";
import noImage from "../assets/no-image.jpg";

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
    <div>
      <h2>Watch History</h2>

      <input
        placeholder="Search history..."
        value={search}
        onChange={(e) => {
          const val = e.target.value;
          setSearch(val);
          fetchHistory(1, val);
        }}
      />

      <div>
       {history.map((h) => (
  <div key={h._id}>
    <img
      src={h.movieId?.poster || noImage}
      alt={h.movieId?.title}
      width="120"
    />
    <h4>{h.movieId?.title}</h4>
  </div>
))}
      </div>

      <div>
        <button disabled={!prevPage} onClick={() => fetchHistory(prevPage, search)}>
          Prev
        </button>

        <span>{page}</span>

        <button disabled={!nextPage} onClick={() => fetchHistory(nextPage, search)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default History;