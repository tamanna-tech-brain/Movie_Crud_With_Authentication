import { useState, useRef, useEffect } from "react";
import { createCategory } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./category.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!name || !description) {
        alert("Fill all fields");
        return;
      }

      await createCategory({ name, description });

      alert("✅ Category Created");
      navigate("/category");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="category-create-container">
      <div className="category-create-card">

        <h2 className="category-create-title">🎬 Create Category</h2>

        <input
          ref={nameRef}
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Create Category
        </button>

      </div>
    </div>
  );
};

export default CreateCategory;