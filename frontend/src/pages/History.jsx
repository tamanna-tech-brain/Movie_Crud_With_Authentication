import { useEffect, useState } from "react";
import API from "../api/axios";

export default function History() {
  const userId = localStorage.getItem("userId");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!userId) return;

    API.get(`/history/get/${userId}`)
      .then(res => setHistory(res.data.data));
  }, []);

  return (
    <div>
      <h2>History</h2>

      {history.map((h) => (
        <div key={h._id}>
          <p>{h.movieId?.title}</p>
        </div>
      ))}
    </div>
  );
}