import { useState, useRef, useEffect } from "react";
import { createCast } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./castForm.css";

const CreateCast = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!name || !age || !bio || !image) {
        return alert("Fill all fields");
      }

      await createCast({ name, age, bio, image });

      alert("🎉 Cast Created Successfully");
      navigate("/cast");
    } catch (err) {
      console.log(err);
      alert("Error creating cast");
    }
  };

  return (
    <div className="castform-container">
      <div className="castform-card">

        <h2 className="castform-title">🎭 Add Cast Member</h2>

        {/* IMAGE PREVIEW */}
        

        <input
          ref={nameRef}
          placeholder="Cast Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Create Cast
        </button>

      </div>
    </div>
  );
};

export default CreateCast;