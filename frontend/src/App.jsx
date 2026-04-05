import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cast from "./pages/Cast";
import CreateCast from "./pages/CreateCast";
import CastDetails from "./pages/CastDetails";
import UpdateCast from "./pages/UpdateCast"; 
import Category from "./pages/Category";
import CreateCategory from "./pages/CreateCategory";
import CategoryDetails from "./pages/CategoryDetails";
import UpdateCategory from "./pages/UpdateCategory";
import CreateMovie from "./pages/CreateMovie";
import MovieDetails from "./pages/MovieDetails";
import UpdateMovie from "./pages/UpdateMovie";
import History from "./pages/History";
import Download from "./pages/Download";

function App() {
  return (
    <>
      <Navbar />  

      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/cast" element={<Cast />} />
        <Route path="/cast/create" element={<CreateCast />} />
        <Route path="/cast/update/:id" element={<UpdateCast />} />
        <Route path="/cast/:id" element={<CastDetails />} />

        <Route path="/category" element={<Category />} />
        <Route path="/category/create" element={<CreateCategory />} />
        <Route path="/category/update/:id" element={<UpdateCategory />} />
        <Route path="/category/:id" element={<CategoryDetails />} />

        <Route path="/" element={<Movies />} />
        <Route path="/movie/create" element={<CreateMovie />} />
        <Route path="/movie/update/:id" element={<UpdateMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/history" element={<History />} />
        <Route path="/downloads" element={<Download />} />
      </Routes>
    </>
  );
}

export default App;