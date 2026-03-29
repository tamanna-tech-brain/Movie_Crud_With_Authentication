import { useEffect, useState, useContext } from "react";
import { getHistory } from "../api/history";
import { AuthContext } from "../context/AuthContext";

export default function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      if (!user) return;

      const res = await getHistory(user._id);
      setHistory(res.data.data);
    } catch (err) {
      console.log("History error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  // 🔒 if not logged in
  if (!user) {
    return <h2 style={{ textAlign: "center" }}>⚠️ Please login to see history</h2>;
  }

  // ⏳ loading state
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading history...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📺 Watch History</h1>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#222",
              color: "white",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            {/* because you used $lookup */}
            <h3>{item.movieId?.title}</h3>
            <p>{item.movieId?.description}</p>

            <small>
              Watched at:{" "}
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}