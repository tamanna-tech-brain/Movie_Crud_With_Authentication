import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthGuard from "./components/AuthGuard";

// Pages
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Cast
import Cast from "./pages/Cast";
import CreateCast from "./pages/CreateCast";
import CastDetails from "./pages/CastDetails";
import UpdateCast from "./pages/UpdateCast";

// Category
import Category from "./pages/Category";
import CreateCategory from "./pages/CreateCategory";
import CategoryDetails from "./pages/CategoryDetails";
import UpdateCategory from "./pages/UpdateCategory";

// Movie
import CreateMovie from "./pages/CreateMovie";
import MovieDetails from "./pages/MovieDetails";
import UpdateMovie from "./pages/UpdateMovie";

// Extra
import History from "./pages/History";
import Download from "./pages/Download";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* ✅ MAIN (PROTECTED) */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <Movies />
            </AuthGuard>
          }
        />

        <Route
          path="/movies"
          element={
            <AuthGuard>
              <Movies />
            </AuthGuard>
          }
        />

        {/* ✅ AUTH (PUBLIC) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ USER (PROTECTED) */}
        <Route
          path="/profile/:id"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />

        {/* ✅ CAST (PROTECTED) */}
        <Route
          path="/cast"
          element={
            <AuthGuard>
              <Cast />
            </AuthGuard>
          }
        />

        <Route
          path="/cast/create"
          element={
            <AuthGuard>
              <CreateCast />
            </AuthGuard>
          }
        />

        <Route
          path="/cast/update/:id"
          element={
            <AuthGuard>
              <UpdateCast />
            </AuthGuard>
          }
        />

        <Route
          path="/cast/:id"
          element={
            <AuthGuard>
              <CastDetails />
            </AuthGuard>
          }
        />

        {/* ✅ CATEGORY (PROTECTED) */}
        <Route
          path="/category"
          element={
            <AuthGuard>
              <Category />
            </AuthGuard>
          }
        />

        <Route
          path="/category/create"
          element={
            <AuthGuard>
              <CreateCategory />
            </AuthGuard>
          }
        />

        <Route
          path="/category/update/:id"
          element={
            <AuthGuard>
              <UpdateCategory />
            </AuthGuard>
          }
        />

        <Route
          path="/category/:id"
          element={
            <AuthGuard>
              <CategoryDetails />
            </AuthGuard>
          }
        />

        {/* ✅ MOVIES (PROTECTED) */}
        <Route
          path="/movie/create"
          element={
            <AuthGuard>
              <CreateMovie />
            </AuthGuard>
          }
        />

        <Route
          path="/movie/update/:id"
          element={
            <AuthGuard>
              <UpdateMovie />
            </AuthGuard>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <AuthGuard>
              <MovieDetails />
            </AuthGuard>
          }
        />

        {/* ✅ EXTRA (PROTECTED) */}
        <Route
          path="/history"
          element={
            <AuthGuard>
              <History />
            </AuthGuard>
          }
        />

        <Route
          path="/downloads"
          element={
            <AuthGuard>
              <Download />
            </AuthGuard>
          }
        />

      </Routes>
    </>
  );
}

export default App;