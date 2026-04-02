import { useEffect, useState } from "react";
import { getMovieById, updateMovie } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getMovieById(id).then(res => {
      setTitle(res.data.data.title);
      setDescription(res.data.data.description);
    });
  }, []);

  const handleUpdate = async () => {
    await updateMovie(id, { title, description });
    alert("Updated");
    navigate("/");
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} />
      <br />

      <input value={description} onChange={e => setDescription(e.target.value)} />
      <br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateMovie;