import { useState } from "react";
import { createCast } from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateCast = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await createCast({ name, age, bio, image });
      alert("Cast created");
      navigate("/cast");
    } catch {
      alert("Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Cast</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <br />
      <input placeholder="Bio" onChange={(e) => setBio(e.target.value)} />
      <br />
      <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
      <br />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateCast;