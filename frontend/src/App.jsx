import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import History from "./pages/History";
import CastDetails from "./pages/CastDetails";
import CategoryDetails from "./pages/CategoryDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id"element={ <ProtectedRoute> <MovieDetails /></ProtectedRoute> } /> 
        <Route path="/history" element={<History />} />
        <Route path="/cast/:id" element={<CastDetails />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
        </Routes></>
  );
}

export default App;