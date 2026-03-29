import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import History from "./pages/History";
import Cast from "./pages/Cast";
import Category from "./pages/Category";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/history" element={<History />} />
        <Route path="/cast" element={<Cast />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;