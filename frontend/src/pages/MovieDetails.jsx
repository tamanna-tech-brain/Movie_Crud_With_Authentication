import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { getMovieById } from "../api/movie";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { getCasts } from "../api/cast";
import { getCategories } from "../api/category";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user } = useContext(AuthContext);
  const [casts, setCasts] = useState([]);
const [categories, setCategories] = useState([]);
const fetchExtra = async () => {
  const castRes = await getCasts();
  const catRes = await getCategories();

  setCasts(castRes.data.data);
  setCategories(catRes.data.data);
};
  const fetchMovie = async () => {
    try {
      const res = await getMovieById(id);
      setMovie(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchMovie();
    if (user) {
      API.post(`/history/watch/${id}`, {
        userId: user._id
      });
    }
  }, [id]);
  useEffect(() => {
  fetchMovie();
  fetchExtra();
}, [id]);

  const handleDownload = async () => {
    try {
      await API.post(`/download/download/${id}`, {
        userId: user._id
      });
      alert("Downloaded");
    } catch (err) {
      console.log(err);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
  <div style={{ padding: "30px", color: "white", background: "#111", minHeight: "100vh" }}>
    <h1>{movie.title}</h1>

    <p>{movie.description}</p>

    <p><b>Language:</b> {movie.language}</p>
    <p><b>Duration:</b> {movie.duration} mins</p>
    <p><b>Year:</b> {movie.releaseYear}</p>

    <p>
      <b>Category:</b>{" "}
      {movie.categoryId?.map((c) => c.name).join(", ")}
    </p>

    <h3>Cast</h3>
    <ul>
      {movie.cast?.map((c) => (
        <li key={c._id || c}>{c.name || c}</li>
      ))}
    </ul>

    <button
      onClick={handleDownload}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "red",
        color: "white",
        border: "none",
        cursor: "pointer"
      }}
    >
      Download 🎬
    </button>
    <p><b>Cast:</b></p>
<ul>
  {movie.cast?.map((cId) => {
    const castObj = casts.find(c => c._id === cId);
    return <li key={cId}>{castObj?.name || cId}</li>;
  })}
</ul>
<p><b>Categories:</b></p>
<ul>
  {movie.categoryId?.map((catId) => {
    const catObj = categories.find(c => c._id === catId);
    return <li key={catId}>{catObj?.name || catId}</li>;
  })}
</ul>
  </div>
);
}