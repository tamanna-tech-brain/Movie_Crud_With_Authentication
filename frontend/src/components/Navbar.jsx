import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-900 text-white flex gap-6 p-4 shadow-lg">
      
      <Link to="/" className="hover:text-red-400">
        Movies
      </Link>

      <Link to="/cast" className="hover:text-red-400">
        Cast
      </Link>

      <Link to="/category" className="hover:text-red-400">
        Category
      </Link>

      <Link to="/history" className="hover:text-red-400">
        History
      </Link>

      <Link to="/downloads" className="hover:text-red-400">
        Downloads
      </Link>

      <Link to="/login" className="hover:text-red-400">
        Login
      </Link>

      <Link to="/register" className="hover:text-red-400">
        Register
      </Link>

    </div>
  );
}

export default Navbar;