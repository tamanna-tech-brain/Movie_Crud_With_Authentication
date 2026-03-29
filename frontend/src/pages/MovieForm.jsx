import { useState, useEffect } from "react";
import { createMovie, updateMovie } from "../api/movie";

export default function MovieForm({ existing, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existing) {
      await updateMovie(existing._id, form);
    } else {
      await createMovie(form);
    }

    setForm({ title: "", description: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button type="submit">
        {existing ? "Update" : "Create"}
      </button>
    </form>
  );
}