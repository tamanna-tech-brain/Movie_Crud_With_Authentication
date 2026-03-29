import { useEffect, useState, useContext } from "react";
import { getHistory } from "../api/history";
import { AuthContext } from "../context/AuthContext";

export default function History() {
  const { user } = useContext(AuthContext);

  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);

  const fetchHistory = async () => {
    try {
      const res = await getHistory(user._id, page);
      setHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchHistory();
  }, [user, page]);

  if (!user) return <h2 style={{ textAlign: "center" }}>Login first</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎥 Watch History</h1>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{item.movieId.title}</h3>
            <p>{item.movieId.description}</p>
            <small>
              Watched at: {new Date(item.watchedAt).toLocaleString()}
            </small>
          </div>
        ))
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}