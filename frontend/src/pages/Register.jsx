import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { registerUser } from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleRegister = async () => {
    console.log("FUNCTION CALLED"); // ✅ debug

    try {
      if (!name || !email || !password) {
        alert("Fill all fields");
        return;
      }

      const res = await registerUser({
        username: name,
        email,
        password,
      });

      console.log("SUCCESS:", res.data);

      localStorage.setItem("userId", res.data.data._id);

      alert("Registered successfully");
      navigate(`/profile/${res.data.data._id}`);

    } catch (error) {
      console.log("ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input
        ref={nameRef}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      {/* ✅ FIXED BUTTON */}
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;