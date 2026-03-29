import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "10px",
      background: "#222",
      color: "white"
    }}>
      <Link to="/">Home</Link>

      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {/* ✅ THIS IS WHERE YOU ADD */}
      {user && <Link to="/history">History</Link>}

      {user && <span>👤 {user.username}</span>}
    </div>
  );
}