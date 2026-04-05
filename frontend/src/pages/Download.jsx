import { useEffect, useState, useMemo } from "react";
import { getMovieById } from "../api/api";
import { Link } from "react-router-dom";

const Download = () => {
  const [downloads, setDownloads] = useState([]);

  const fetchDownloads = async () => {
    const stored = JSON.parse(localStorage.getItem("downloads")) || [];

    const moviePromises = stored.map(id => getMovieById(id));

    const results = await Promise.all(moviePromises);

    const movies = results.map(res => res.data.data);

    setDownloads(movies);
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const downloadList = useMemo(() => {
    return downloads.map((m) => (
      <div key={m._id} style={{
        border: "1px solid",
        margin: "10px",
        padding: "10px"
      }}>
        <h3>{m.title}</h3>
        <Link to={`/movie/${m._id}`}>View</Link>
      </div>
    ));
  }, [downloads]);

  if (downloads.length === 0) return <p>No downloads found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Downloaded Movies</h2>
      {downloadList}
    </div>
  );
};

export default Download;