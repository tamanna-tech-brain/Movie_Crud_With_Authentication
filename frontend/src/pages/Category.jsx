import { useEffect, useState, useMemo, useRef } from "react";
import { getCategories, deleteCategory } from "../api/api";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const hasFetched = useRef(false);

  const fetchCategories = async (pg = 1) => {
    const res = await getCategories(pg);
    setCategories(res.data.data);
    setPage(res.data.page);
    setNextPage(res.data.nextPage);
    setPrevPage(res.data.prevPage);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchCategories();
      hasFetched.current = true;
    }
  }, []);

  const categoryList = useMemo(() => {
    return categories.map((c) => (
      <div key={c._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
        <h3>{c.name}</h3>
        <p>{c.description}</p>

        <Link to={`/category/${c._id}`}>View</Link>{" | "}
        <Link to={`/category/update/${c._id}`}>Edit</Link>{" | "}
        <button onClick={() => deleteCategory(c._id)}>Delete</button>
      </div>
    ));
  }, [categories]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categories</h2>

      <Link to="/category/create">Add Category</Link>

      {categoryList}

      <button disabled={!prevPage} onClick={() => fetchCategories(prevPage)}>
        Previous
      </button>

      <span> Page {page} </span>

      <button disabled={!nextPage} onClick={() => fetchCategories(nextPage)}>
        Next
      </button>
    </div>
  );
};

export default Category;