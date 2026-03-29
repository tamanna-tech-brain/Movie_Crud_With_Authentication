import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px", background: "#222", color: "white" }}>
      <Link to="/">Home</Link>

      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user && <Link to="/history">History</Link>}
      {user && <Link to="/profile">Profile</Link>}

      {user && (
        <button onClick={() => setUser(null)}>
          Logout
        </button>
      )}
    </div>
  );
}