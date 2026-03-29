import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const [movie, setMovie] = useState({});

  useEffect(() => {
    API.get(`/movie/get/${id}`)
      .then(res => setMovie(res.data.data));

    if (userId) {
      API.post(`/history/watch/${id}`, { userId });
    }
  }, []);

  const handleDownload = async () => {
    await API.post(`/download/download/${id}`, { userId });
    alert("Downloaded");
  };

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>

      <button onClick={handleDownload}>Download</button>
    </div>
  );
}