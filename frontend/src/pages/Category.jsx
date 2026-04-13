import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/api";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 2;

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await getCategories({
        page,
        limit,
        search
      });

      setCategories(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);

    } catch (err) {
      console.log(err);
      alert("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
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
          setPage(1);
        }}
        className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* GRID */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
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
                <img
                  src={`https://source.unsplash.com/400x300/?${c.name}`}
                  alt={c.name}
                  className="w-full h-56 object-cover"
                />

                {/* INFO */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {c.name}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1 truncate">
                    {c.description}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex justify-between mt-4 text-sm">

                    <Link
                      to={`/category/${c._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      to={`/category/update/${c._id}`}
                      className="text-yellow-400 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          ⬅ Prev
        </button>

        <span className="text-lg font-semibold text-red-400">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>
    </div>
  );
};

export default Category;