import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movie";
import { getCasts } from "../api/cast";
import { getCategories } from "../api/category";
import { downloadMovie } from "../api/download";
import { watchMovie } from "../api/history";
import { AuthContext } from "../context/AuthContext";
import { addFavorite } from "../api/favorite";

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchMovie();
    fetchExtra();

    if (user) {
      watchMovie(id, user._id);
    }
  }, [id]);

  const fetchMovie = async () => {
    const res = await getMovieById(id);
    setMovie(res.data.data);
  };

  const fetchExtra = async () => {
    const castRes = await getCasts();
    const catRes = await getCategories();

    setCasts(castRes.data.data);
    setCategories(catRes.data.data);
  };

  const handleDownload = async () => {
    await downloadMovie(id, user._id);
    alert("Downloaded");
  };

  if (!movie) return <p>Loading...</p>;
  const handleFavorite = async () => {
  try {
    await addFavorite(user._id, id);
    alert("Added to favorites ❤️");
  } catch (err) {
    alert("Already added or error");
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      <p><b>Language:</b> {movie.language}</p>
      <p><b>Duration:</b> {movie.duration}</p>
      <p><b>Year:</b> {movie.releaseYear}</p>

      <h3>Cast:</h3>
      <ul>
        {movie.cast?.map(id => {
          const c = casts.find(x => x._id === id);
          return <li key={id}>{c?.name}</li>;
        })}
      </ul>

      <h3>Categories:</h3>
      <ul>
        {movie.categoryId?.map(id => {
          const c = categories.find(x => x._id === id);
          return <li key={id}>{c?.name}</li>;
        })}
      </ul>

      {user && <button onClick={handleDownload}>Download</button>}
      {user && (
  <button onClick={handleFavorite}>
    ❤️ Add to Favorites
  </button>
)}
styling 👇

<button
  onClick={handleFavorite}
  style={{
    marginTop: "10px",
    padding: "10px",
    background: "crimson",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  ❤️ Add to Favorites
</button>
    </div>
  );
}