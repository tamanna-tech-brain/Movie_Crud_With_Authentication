import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../api/movie";
import MovieForm from "./MovieForm";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMovies = async () => {
    const res = await getMovies();
    setMovies(res.data.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    fetchMovies();
  };

  return (
    <div>
      <h1>Movies</h1>

      <MovieForm existing={selected} refresh={fetchMovies} />

      {movies.map((m) => (
        <div key={m._id}>
          <h3>{m.title}</h3>
          <p>{m.description}</p>

          <button onClick={() => setSelected(m)}>Edit</button>
          <button onClick={() => handleDelete(m._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}