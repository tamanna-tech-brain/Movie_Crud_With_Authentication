import { useEffect, useState } from "react";
import API from "../api/axios";
import MovieForm from "./MovieForm";

export default function Movie() {
  const [movies, setMovies] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/movie/get");
    setMovies(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎬 Movies CRUD</h1>

      {movies.map((m) => (
        <div key={m._id} style={{ background: "#eee", margin: 10, padding: 10 }}>
          <h3>{m.title}</h3>
          <p>{m.description}</p>
        </div>
      ))}
    </div>
  );
}