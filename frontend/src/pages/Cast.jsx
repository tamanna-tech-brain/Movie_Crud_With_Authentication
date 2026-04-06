import { useEffect, useState } from "react";
import { getCasts, deleteCast } from "../api/api";
import { Link } from "react-router-dom";
import "./cast.css";

const Cast = () => {
  const [casts, setCasts] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchCasts = async (pg = 1) => {
    try {
      const res = await getCasts(pg);

      setCasts(res.data.data || []);
      setPage(res.data.page);
      setNextPage(res.data.nextPage);
      setPrevPage(res.data.prevPage);
    } catch {
      alert("Error fetching casts");
    }
  };

  useEffect(() => {
    fetchCasts();
  }, []);

  const handleDelete = async (id) => {
    await deleteCast(id);
    fetchCasts(page); // refresh current page
  };

  return (
    <div className="cast-container">

      <h2 className="cast-title">🎭 Cast Members</h2>

      <Link to="/cast/create" className="cast-add">
        + Add Cast
      </Link>

      {/* GRID */}
      <div className="cast-grid">
        {casts.map((c) => (
          <div className="cast-card" key={c._id}>

            {/* IMAGE */}
            <div className="cast-img">
              <img
                src={c.image || "https://via.placeholder.com/300x300"}
                alt={c.name}
              />

              {/* HOVER */}
              <div className="cast-hover">
                <button onClick={() => handleDelete(c._id)}>
                  Delete
                </button>
              </div>
            </div>

            {/* INFO */}
            <div className="cast-info">
              <h3>{c.name}</h3>
              <p>Age: {c.age}</p>

              <div className="cast-actions">
                <Link to={`/cast/${c._id}`}>View</Link>
                <Link to={`/cast/update/${c._id}`}>Edit</Link>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ✅ PAGINATION */}
      <div className="cast-pagination">
        <button
          disabled={!prevPage}
          onClick={() => fetchCasts(prevPage)}
        >
          ⬅ Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={!nextPage}
          onClick={() => fetchCasts(nextPage)}
        >
          Next ➡
        </button>
      </div>

    </div>
  );
};

export default Cast;