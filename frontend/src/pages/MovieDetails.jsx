import { useEffect, useState } from "react";
import { getMovieById } from "../api/api";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(id).then(res => setMovie(res.data.data));
  }, []);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Language: {movie.language}</p>
      <p>Year: {movie.releaseYear}</p>
    </div>
  );
};

export default MovieDetails;