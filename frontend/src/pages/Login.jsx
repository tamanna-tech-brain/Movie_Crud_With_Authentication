import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { loginUser } from "../api/api";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) return alert("Fill all fields");

      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.data._id);

      alert("✅ Login successful");
      navigate(`/profile/${res.data.data._id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Login</h2>

        <input
          ref={emailRef}
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

        <button onClick={handleLogin}>
          Login
        </button>

        {/* ✅ FIXED */}
        <p className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;