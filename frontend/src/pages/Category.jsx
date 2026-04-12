import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/api";
import { Link } from "react-router-dom";
import { paginate, searchFilter } from "../utils";

const Category = () => {
  const [allCategories, setAllCategories] = useState([]); // full data
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 2;

  // ✅ Fetch once (NO pagination here)
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setAllCategories(res.data.data || []);
    } catch {
      alert("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Apply search
  const filteredCategories = searchFilter(allCategories, search, "name");

  // ✅ Apply pagination
  const {
    data: paginatedCategories,
    nextPage,
    prevPage,
    totalPages
  } = paginate(filteredCategories, page, limit);

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories(); // refresh
    } catch {
      alert("Delete failed");
    }
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
          setPage(1); // ✅ reset page
        }}
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedCategories.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">
            No categories found
          </p>
        ) : (
          paginatedCategories.map((c) => (
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

                {/* DELETE */}
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
                <p className="text-gray-400 text-sm mt-1">
                  {c.description}
                </p>

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
          onClick={() => setPage(prevPage)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-lg font-semibold text-red-400">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={!nextPage}
          onClick={() => setPage(nextPage)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          Next ➡
        </button>
      </div>

    </div>
  );
};

export default Category;