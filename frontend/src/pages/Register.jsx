import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { registerUser } from "../api/api";
import "./auth.css";

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

      alert("✅ Registered successfully");

      localStorage.setItem("userId", res.data.data._id);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Create Account</h2>

        <input
          ref={nameRef}
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        {/* ✅ FIXED */}
        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;