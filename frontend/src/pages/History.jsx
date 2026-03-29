import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await API.get(`/history/get/${user._id}`);
      setHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📺 Watch History</h1>

      {history.length === 0 ? (
        <p>No history</p>
      ) : (
        history.map((h) => (
          <div key={h._id} style={card}>
            <h3>{h.movieId.title}</h3>
            <p>{h.movieId.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  background: "#eee",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
};