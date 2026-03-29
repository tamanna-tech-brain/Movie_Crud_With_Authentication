import { Link } from "react-router-dom";

export default function Navbar() {
  const userId = localStorage.getItem("userId");

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Link to="/">Home</Link>

      {!userId && <Link to="/login">Login</Link>}
      {!userId && <Link to="/register">Register</Link>}

      {userId && <Link to="/profile">Profile</Link>}
      {userId && <Link to="/history">History</Link>}
      {userId && <Link to="/cast">Cast</Link>}
      {userId && <Link to="/category">Category</Link>}

      {userId && (
        <button
          onClick={() => {
            localStorage.removeItem("userId");
            window.location.reload();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}