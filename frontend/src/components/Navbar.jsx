import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: "10px", background: "#222" }}>
      <Link to="/" style={{ marginRight: 10, color: "#fff" }}>
        Movies
      </Link>

      <Link to="/categories" style={{ marginRight: 10, color: "#fff" }}>
        Categories
      </Link>

      <Link to="/casts" style={{ marginRight: 10, color: "#fff" }}>
        Casts
      </Link>

      <Link to="/login" style={{ marginRight: 10, color: "#fff" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "#fff" }}>
        Register
      </Link>
    </div>
  );
}