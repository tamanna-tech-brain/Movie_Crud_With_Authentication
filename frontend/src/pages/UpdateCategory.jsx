import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getCategoryById(id).then((res) => {
      const data = res.data.data;
      setName(data.name);
      setDescription(data.description);
    });
  }, []);

  const handleUpdate = async () => {
    try {
      await updateCategory(id, { name, description });
      alert("Updated successfully");

      navigate("/category"); // go back
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <h2>Update Category</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <br />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateCategory;