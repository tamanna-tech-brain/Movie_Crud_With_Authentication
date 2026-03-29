import { useEffect, useState } from "react";
import {
  getCasts,
  createCast,
  deleteCast,
  updateCast,
} from "../api/cast";

export default function Cast() {
  const [casts, setCasts] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await getCasts();
    setCasts(res.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleAdd = async () => {
    await createCast({ name });
    setName("");
    fetch();
  };

  const handleDelete = async (id) => {
    await deleteCast(id);
    fetch();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name");
    await updateCast(id, { name: newName });
    fetch();
  };

  return (
    <div>
      <h2>Cast</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      {casts.map((c) => (
        <div key={c._id}>
          <p>{c.name}</p>

          <button onClick={() => handleUpdate(c._id)}>Update</button>
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}