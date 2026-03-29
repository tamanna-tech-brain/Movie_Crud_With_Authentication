import { useState } from "react";
import { createMovie, updateMovie } from "../api/movie";

export default function MovieForm({ existing, refresh }) {
  const [form, setForm] = useState({
    userId: "",
    title: "",
    description: "",
    categoryId: "",
    language: "",
    duration: "",
    cast: "",
    releaseYear: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      categoryId: form.categoryId.split(","), // array
      cast: form.cast.split(",") // array
    };

    if (existing) {
      await updateMovie(existing._id, payload);
      alert("Updated");
    } else {
      await createMovie(payload);
      alert("Created");
    }

    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="UserId" onChange={(e)=>setForm({...form,userId:e.target.value})}/>
      <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})}/>
      <input placeholder="Category IDs (comma separated)" onChange={(e)=>setForm({...form,categoryId:e.target.value})}/>
      <input placeholder="Language" onChange={(e)=>setForm({...form,language:e.target.value})}/>
      <input placeholder="Duration" onChange={(e)=>setForm({...form,duration:e.target.value})}/>
      <input placeholder="Cast IDs (comma separated)" onChange={(e)=>setForm({...form,cast:e.target.value})}/>
      <input placeholder="Year" onChange={(e)=>setForm({...form,releaseYear:e.target.value})}/>

      <button>{existing ? "Update" : "Create"} Movie</button>
    </form>
  );
}