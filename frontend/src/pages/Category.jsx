import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/api";
import { Link } from "react-router-dom";
import "./category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchCategories = async (pg = 1) => {
    try {
      const res = await getCategories(pg);

      setCategories(res.data.data || []);
      setPage(res.data.page);
      setNextPage(res.data.nextPage);
      setPrevPage(res.data.prevPage);
    } catch {
      alert("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories(page);
  };

  return (
    <div className="cat-container">

      <div className="cat-header">
        <h2>📂 Categories</h2>
        <Link to="/category/create" className="cat-add">
          + Add Category
        </Link>
      </div>

      {/* GRID */}
      <div className="cat-grid">
        {categories.map((c) => (
          <div className="cat-card" key={c._id}>

            <div className="cat-img">
              <img
                src={`https://source.unsplash.com/400x300/?${c.name}`}
                alt={c.name}
              />

              <div className="cat-hover">
                <button onClick={() => handleDelete(c._id)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="cat-info">
              <h3>{c.name}</h3>
              <p>{c.description}</p>

              <div className="cat-actions">
                <Link to={`/category/${c._id}`}>View</Link>
                <Link to={`/category/update/${c._id}`}>Edit</Link>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="cat-pagination">
        <button disabled={!prevPage} onClick={() => fetchCategories(prevPage)}>
          ⬅ Prev
        </button>

        <span>Page {page}</span>

        <button disabled={!nextPage} onClick={() => fetchCategories(nextPage)}>
          Next ➡
        </button>
      </div>

    </div>
  );
};

export default Category;