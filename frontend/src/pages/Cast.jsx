import { useEffect, useState } from "react";
import { getCasts, deleteCast } from "../api/api";
import { Link } from "react-router-dom";

const Cast = () => {
  const [casts, setCasts] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const fetchCasts = async (pg = 1) => {
    try {
      const res = await getCasts(pg);
      setCasts(res.data.data);
      setPage(res.data.page);
      setNextPage(res.data.nextPage);
    } catch (err) {
      alert("Error fetching casts");
    }
  };

  useEffect(() => {
    fetchCasts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCast(id);
      alert("Deleted");
      fetchCasts(page);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cast List</h2>

      <Link to="/cast/create">Add Cast</Link>

      {casts.map((c) => (
        <div key={c._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <h3>{c.name}</h3>
          <p>{c.bio}</p>
          <p>Age: {c.age}</p>

          <Link to={`/cast/${c._id}`}>View</Link>{" | "}
          <Link to={`/cast/update/${c._id}`}>Edit</Link>{" | "}
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}

      <br />

      {nextPage && (
        <button onClick={() => fetchCasts(nextPage)}>
          Next Page
        </button>
      )}
    </div>
  );
};

export default Cast;