import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/api";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCategories = async (pg = 1, searchText = "") => {
    try {
      const res = await getCategories(pg, searchText);

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
    fetchCategories(page, search);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📂 Categories</h2>

        <Link
          to="/category/create"
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          + Add Category
        </Link>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          fetchCategories(1, e.target.value);
        }}
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">
            No categories found
          </p>
        ) : (
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative group">
                <img
                  src={`https://source.unsplash.com/400x300/?${c.name}`}
                  alt={c.name}
                  className="w-full h-56 object-cover"
                />

                {/* DELETE HOVER */}
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{c.description}</p>

                <div className="flex justify-between mt-3 text-sm">
                  <Link className="text-blue-400 hover:underline" to={`/category/${c._id}`}>
                    View
                  </Link>
                  <Link className="text-yellow-400 hover:underline" to={`/category/update/${c._id}`}>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={!prevPage}
          onClick={() => fetchCategories(prevPage, search)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-lg font-semibold text-red-400">
          Page {page}
        </span>

        <button
          disabled={!nextPage}
          onClick={() => fetchCategories(nextPage, search)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          Next ➡
        </button>
      </div>

    </div>
  );
};

export default Category;