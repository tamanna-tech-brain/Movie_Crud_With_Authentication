import { useEffect, useState, useMemo } from "react";
import { getHistory } from "../api/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchHistory = async () => {
    try {
      const res = await getHistory(userId, 1);
      setHistory(res.data.data);
    } catch {
      alert("Error fetching history");
    }
  };

  useEffect(() => {
    if (!userId) {
      alert("Please login first");
      return;
    }
    fetchHistory();
  }, []);

  // ✅ useMemo
  const historyList = useMemo(() => {
    return history.map((h) => (
      <div key={h._id} style={{
        background: "#1c1c1c",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px"
      }}>
        <h3>{h.movieId?.title}</h3>
        <p>User: {h.userId}</p>
      </div>
    ));
  }, [history]);

  if (!history) return <p>Loading...</p>;
  if (history.length === 0) return <p>No history found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Watch History</h2>
      {historyList}
    </div>
  );
};

export default History;