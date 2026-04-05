import { useState, useEffect, useRef } from "react";
import { createMovie } from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateMovie = () => {
  const navigate = useNavigate();

  const titleRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [castId, setCastId] = useState("");

  const [categories, setCategories] = useState([]);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    titleRef.current.focus(); // ✅ autofocus

    axios.get("http://localhost:3000/api/category/get")
      .then(res => setCategories(res.data.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:3000/api/cast/get")
      .then(res => setCasts(res.data.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) return alert("Please login first");

      if (!title || !description || !language || !duration || !releaseYear || !categoryId || !castId) {
        return alert("Fill all fields");
      }

      await createMovie({
        userId,
        title,
        description,
        language,
        duration: Number(duration),
        releaseYear: Number(releaseYear),
        categoryId: [categoryId],
        cast: [castId]
      });

      alert("Movie Created");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error creating movie");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Movie</h2>

      <input ref={titleRef} placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <br />

      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
      <br />

      <input placeholder="Language" onChange={e => setLanguage(e.target.value)} />
      <br />

      <input type="number" placeholder="Duration" onChange={e => setDuration(e.target.value)} />
      <br />

      <input type="number" placeholder="Release Year" onChange={e => setReleaseYear(e.target.value)} />
      <br />

      <select onChange={e => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <br />

      <select onChange={e => setCastId(e.target.value)}>
        <option value="">Select Cast</option>
        {casts.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <br />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateMovie;