import { useState } from "react";
import { createCast, updateCast } from "../api/cast";

export default function CastForm({ existing, refresh }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    bio: "",
    image: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (existing) {
      await updateCast(existing._id, form);
    } else {
      await createCast(form);
    }

    refresh();
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Age" onChange={(e)=>setForm({...form,age:e.target.value})}/>
      <input placeholder="Bio" onChange={(e)=>setForm({...form,bio:e.target.value})}/>
      <input placeholder="Image URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>

      <button>{existing ? "Update" : "Create"}</button>
    </form>
  );
}