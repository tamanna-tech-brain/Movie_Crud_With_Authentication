import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      API.get(`/history/get/${user._id}`)
        .then((res) => setHistory(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  if (!user) return <h2>Please login</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Watch History</h1>

      {history.length === 0 ? (
        <p>No history</p>
      ) : (
        history.map((item) => (
          <div key={item._id}>
            <h3>{item.movieId?.title}</h3>
            <p>{item.movieId?.description}</p>
          </div>
        ))
      )}
    </div>
  );
}