import { useState, useEffect, useRef } from "react";
import { createMovie, getCategories, getCasts } from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const navigate = useNavigate();
  const titleRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const [categoryIds, setCategoryIds] = useState([]);
  const [castIds, setCastIds] = useState([]);

  const [categories, setCategories] = useState([]);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    titleRef.current.focus();

    const fetchAllData = async () => {
      try {
        let allCategories = [];
        let allCasts = [];

        let page = 1;
        let nextPage = true;

        while (nextPage) {
          const res = await getCategories(page);
          allCategories = [...allCategories, ...(res.data.data || [])];
          nextPage = res.data.nextPage;
          page = nextPage;
        }

        page = 1;
        nextPage = true;

        while (nextPage) {
          const res = await getCasts(page);
          allCasts = [...allCasts, ...(res.data.data || [])];
          nextPage = res.data.nextPage;
          page = nextPage;
        }

        setCategories(allCategories);
        setCasts(allCasts);

      } catch (err) {
        console.log(err);
        alert("Error loading data");
      }
    };

    fetchAllData();
  }, []);

  const handleCategoryChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (o) => o.value);
    setCategoryIds(values);
  };

  const handleCastChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (o) => o.value);
    setCastIds(values);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) return alert("Login first");

      await createMovie({
        userId,
        title,
        description,
        language,
        duration: Number(duration),
        releaseYear: Number(releaseYear),
        categoryId: categoryIds,
        cast: castIds
      });

      alert("🎉 Movie Created Successfully");
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Error creating movie");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f0f",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#1c1c1c",
        padding: "25px",
        borderRadius: "10px",
        width: "400px"
      }}>
        <h2 style={{ textAlign: "center" }}>🎬 Create Movie</h2>

        <input
          ref={titleRef}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />

        <input
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />

        <input
          placeholder="Language"
          onChange={(e) => setLanguage(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Duration"
          onChange={(e) => setDuration(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Release Year"
          onChange={(e) => setReleaseYear(e.target.value)}
          className="input"
        /> 

        <label>Categories</label>
        <select multiple onChange={handleCategoryChange} className="select">
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <label>Cast</label>
        <select multiple onChange={handleCastChange} className="select">
          {casts.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <button onClick={handleSubmit} className="btn">
          Create Movie
        </button>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 6px;
          border: none;
          background: #2a2a2a;
          color: white;
        }

        .select {
          width: 100%;
          height: 90px;
          margin-bottom: 10px;
          background: #2a2a2a;
          color: white;
        }

        .btn {
          width: 100%;
          padding: 10px;
          background: red;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn:hover {
          background: darkred;
        }
      `}</style>
    </div>
  );
};

export default CreateMovie;