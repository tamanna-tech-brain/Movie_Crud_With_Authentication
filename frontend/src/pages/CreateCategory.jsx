import { useState } from "react";
import { createCategory } from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createCategory({ name, description });
      alert("Category created");
      navigate("/category");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h2>Create Category</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br />

      <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <br />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateCategory;