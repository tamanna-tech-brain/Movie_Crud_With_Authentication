import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/category";
import CategoryForm from "./CategoryForm";

export default function Category() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const res = await getCategories();
    setData(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Categories</h2>

      {/* ✅ CREATE / UPDATE FORM MUST BE HERE */}
      <CategoryForm existing={selected} refresh={fetchData} />

      {/* LIST */}
      {data.map((c) => (
        <div key={c._id}>
          {c.name}

          <button onClick={() => setSelected(c)}>Edit</button>
          <button onClick={() => deleteCategory(c._id).then(fetchData)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}