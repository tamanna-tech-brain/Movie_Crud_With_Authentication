import { useEffect, useState } from "react";
import { getMovies, createMovie, deleteMovie } from "../api";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchMovies = () => {
    getMovies().then(setMovies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);
}
 const handleCreate = () => {
    createMovie({ title, description })
      .then(() => {
        fetchMovies(); // refresh UI
      });
  };
    const handleDelete = (id) => {
    deleteMovie(id).then(() => {
      fetchMovies(); // refresh UI
    });
  };
    return (
    <div>
      <h2>Movies</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>

      {movies.map((m) => (
        <div
          key={m._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h3>{m.title}</h3>
          <p>{m.description}</p>

          <button onClick={() => handleDelete(m._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );


export default Movies;