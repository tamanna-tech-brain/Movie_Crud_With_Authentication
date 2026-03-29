import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser(form);
    setUser(res.data.data);
    alert("Login successful");
    navigate("/");
  } catch (err) {
    alert(err.response?.data?.message || "Error");
  }
};
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button>Login</button>
      </form>
    </div>
  );
}