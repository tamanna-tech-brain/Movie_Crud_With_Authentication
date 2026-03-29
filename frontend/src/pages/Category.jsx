import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../api/category";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await getCategories();
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleAdd = async () => {
    await createCategory({ name });
    fetch();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetch();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("New name");
    await updateCategory(id, { name: newName });
    fetch();
  };

  return (
    <div>
      <h2>Category</h2>

      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      {categories.map((c) => (
        <div key={c._id}>
          <p>{c.name}</p>

          <button onClick={() => handleUpdate(c._id)}>Update</button>
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}