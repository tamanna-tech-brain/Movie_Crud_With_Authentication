import { useEffect, useState } from "react";
import { getCastById, updateCast } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCast = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getCastById(id).then(res => {
      const data = res.data.data;
      setName(data.name);
      setAge(data.age);
      setBio(data.bio);
      setImage(data.image);
    });
  }, []);

  const handleUpdate = async () => {
    try {
      await updateCast(id, { name, age, bio, image });
      alert("Updated successfully");

      navigate("/cast"); // go back
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Update Cast</h2>

      <input value={name} onChange={e => setName(e.target.value)} />
      <br />

      <input value={age} onChange={e => setAge(e.target.value)} />
      <br />

      <input value={bio} onChange={e => setBio(e.target.value)} />
      <br />

      <input value={image} onChange={e => setImage(e.target.value)} />
      <br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateCast;