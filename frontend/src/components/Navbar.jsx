import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ background: "black", color: "white", padding: "10px" }}>
      <Link to="/" style={{ margin: 10 }}>Home</Link>
      <Link to="/cast" style={{ margin: 10 }}>Cast</Link>
      <Link to="/category" style={{ margin: 10 }}>Category</Link>

      {user && <Link to="/history" style={{ margin: 10 }}>History</Link>}

      {!user ? (
        <>
          <Link to="/login" style={{ margin: 10 }}>Login</Link>
          <Link to="/register" style={{ margin: 10 }}>Register</Link>
        </>
      ) : (
        <span>👤 {user.username}</span>
      )}
    </div>
  );
}