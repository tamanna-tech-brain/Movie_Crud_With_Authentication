import { useEffect, useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../api/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Fetch movies
  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      console.log("API Response:", res.data);

      // handle both possible response formats
      setMovies(res.data.movies || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ✅ Create Movie
  const handleCreate = async () => {
    try {
      if (!title || !description) {
        return alert("Please fill all fields");
      }

      await createMovie({ title, description });

      setTitle("");
      setDescription("");
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Update Movie
  const handleUpdate = async () => {
    try {
      if (!editId) return;

      await updateMovie(editId, { title, description });

      setTitle("");
      setDescription("");
      setEditId(null);

      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Delete Movie
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Filtering + Search
  const filteredMovies = movies
    .filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((m) => {
      if (filter === "short") return m.title.length < 6;
      return true;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movies App</h2>

      {/* ✅ Form */}
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <button onClick={editId ? handleUpdate : handleCreate}>
          {editId ? "Update" : "Create"}
        </button>
      </div>

      <hr />

      {/* ✅ Search */}
      <input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ Filter */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("short")}>Short Titles</button>
      </div>

      <hr />

      {/* ✅ Movies List */}
      {filteredMovies.map((m) => (
        <div key={m._id} style={{ marginBottom: "15px" }}>
          <h3>{m.title}</h3>
          <p>{m.description}</p>

          <button
            onClick={() => {
              setEditId(m._id);
              setTitle(m.title);
              setDescription(m.description);
            }}
          >
            Edit
          </button>

          <button onClick={() => handleDelete(m._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Movies;