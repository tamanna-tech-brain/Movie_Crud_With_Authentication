import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../api/movie";
import MovieForm from "./MovieForm";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchMovies = async () => {
    const res = await getMovies();
    setMovies(res.data.data || []);
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
      <h2>Movies</h2>

      <MovieForm existing={selected} refresh={fetchMovies} />

      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            {m.title}

            <button onClick={() => setSelected(m)}>Edit</button>
            <button onClick={() => handleDelete(m._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}