import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        return alert("Fill all fields");
      }

      const res = await registerUser({
        username: name,
        email,
        password,
      });
     console.log(res.data);

      console.log("Response:" , res.data);
      alert("Registered successfully");
      navigate(`/profile/${res.data.data._id}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input
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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;