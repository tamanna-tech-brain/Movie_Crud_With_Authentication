import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "#202020",
      padding: "12px",
      display: "flex",
      gap: "15px"
    }}>
      <Link to="/" style={{ color: "white" }}>Movies</Link>

      <Link to="/register" style={{ color: "white" }}>Register</Link>

      <Link to="/login" style={{ color: "white" }}>Login</Link>

      <Link to="/cast" style={{ color: "white" }}>Cast</Link>

      <Link to="/cast/create" style={{ color: "white" }}>Add Cast</Link>

      <Link to="/category" style={{ color: "white" }}>Category</Link>

      <Link to="/category/create" style={{ color: "white" }}>Add Category</Link>

      <Link to="/movie/create" style={{ color: "white" }}>Add Movie</Link>
      <Link to="/history" style={{ color: "white" }}>
  History
</Link>
    </div>
  );
}

export default Navbar;