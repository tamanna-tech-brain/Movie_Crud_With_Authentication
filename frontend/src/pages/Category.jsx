import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/api";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchCategories = async (pg = 1) => {
    try {
      const res = await getCategories(pg);

      setCategories(res.data.data);
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
    try {
      await deleteCategory(id);
      alert("Deleted");
      fetchCategories(page);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categories</h2>

      <Link to="/category/create">Add Category</Link>

      {categories.map((c) => (
        <div key={c._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <h3>{c.name}</h3>
          <p>{c.description}</p>

          <Link to={`/category/${c._id}`}>View</Link>{" | "}
          <Link to={`/category/update/${c._id}`}>Edit</Link>{" | "}
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}

      <br />

      {/* Pagination */}
      <button disabled={!prevPage} onClick={() => fetchCategories(prevPage)}>
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page}
      </span>

      <button disabled={!nextPage} onClick={() => fetchCategories(nextPage)}>
        Next
      </button>
    </div>
  );
};

export default Category;