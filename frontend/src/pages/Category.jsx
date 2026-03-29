import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/category";
import CategoryForm from "./CategoryForm";

export default function Category() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetch = async () => {
    const res = await getCategories();
    setData(res.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1>Category</h1>

      <CategoryForm existing={selected} refresh={fetch} />

      {data.map((c) => (
        <div key={c._id}>
          <h3>{c.name}</h3>
          <button onClick={() => setSelected(c)}>Edit</button>
          <button onClick={() => deleteCategory(c._id).then(fetch)}>Delete</button>
        </div>
      ))}
    </div>
  );
}