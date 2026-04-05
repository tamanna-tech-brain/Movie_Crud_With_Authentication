import { useEffect, useState, useMemo, useRef } from "react";
import { getMovies, deleteMovie, watchMovie, downloadMovie } from "../api/api";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  // ✅ NEW STATE (for downloaded movies)
  const [downloadedIds, setDownloadedIds] = useState([]);

  const userId = localStorage.getItem("userId");
  const hasFetched = useRef(false);

  const fetchMovies = async (pg = 1) => {
    try {
      const res = await getMovies(pg);

      setMovies(res.data.data || []);
      setPage(res.data.page);
      setNextPage(res.data.nextPage);
    } catch (err) {
      console.log(err);
      alert("Error fetching movies");
    }
  };

  // ✅ LOAD downloaded ids from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("downloads")) || [];
    setDownloadedIds(stored);
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchMovies();
      hasFetched.current = true;
    }
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    fetchMovies(page);
  };

  const handleWatch = async (movieId) => {
    if (!userId) {
      alert("Login first");
      return;
    }

    try {
      await watchMovie(movieId, { userId, movieId });
      alert("Added to history");
    } catch {
      alert("Watch failed");
    }
  };

  // ✅ FIXED DOWNLOAD
  const handleDownload = async (movieId) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const res = await downloadMovie(movieId, {
        userId,
        movieId
      });

      alert(res.data.message || "Downloaded successfully");

      // ✅ SAVE to localStorage
      const updated = [...downloadedIds, movieId];
      setDownloadedIds(updated);
      localStorage.setItem("downloads", JSON.stringify(updated));

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      // ✅ HANDLE DUPLICATE ERROR
      if (err.response?.data?.error?.includes("duplicate")) {
        alert("Already downloaded ✅");

        // still mark as downloaded in UI
        const updated = [...downloadedIds, movieId];
        setDownloadedIds(updated);
        localStorage.setItem("downloads", JSON.stringify(updated));
      } else {
        alert("Download failed");
      }
    }
  };

  // ✅ SAFE useMemo (UI NEVER disappears)
  const movieList = useMemo(() => {
    if (!movies || movies.length === 0) {
      return <p>No movies found</p>;
    }

    return movies.map((m) => {
      const isDownloaded = downloadedIds.includes(m._id);

      return (
        <div
          key={m._id}
          style={{ border: "1px solid", margin: "10px", padding: "10px" }}
        >
          <h3>{m.title}</h3>

          {/* ✅ ALL OPTIONS ALWAYS VISIBLE */}
          <Link to={`/movie/${m._id}`}>View</Link> |{" "}
          <Link to={`/movie/update/${m._id}`}>Edit</Link> |{" "}
          <button onClick={() => handleDelete(m._id)}>Delete</button>

          <br />

          <button onClick={() => handleWatch(m._id)}>Watch</button>

          {/* ✅ DOWNLOAD BUTTON FIX */}
          <button
            onClick={() => handleDownload(m._id)}
            disabled={isDownloaded}
          >
            {isDownloaded ? "Downloaded ✅" : "Download"}
          </button>
        </div>
      );
    });
  }, [movies, downloadedIds]); // ✅ IMPORTANT dependency

  return (
    <div>
      <h2>Movies</h2>

      <Link to="/movie/create">Add Movie</Link>
      <br />
      <Link to="/downloads">My Downloads</Link>

      {/* ✅ UI always renders */}
      {movieList}

      {nextPage && (
        <button onClick={() => fetchMovies(nextPage)}>Next</button>
      )}
    </div>
  );
};

export default Movies;