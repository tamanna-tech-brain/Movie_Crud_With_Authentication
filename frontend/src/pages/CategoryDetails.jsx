import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../api/category";

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    const res = await getCategoryById(id);
    setCategory(res.data.data);
  };

  if (!category) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <ul>
  {movie.categoryId?.map((catId) => {
    const catObj = categories.find(c => c._id === catId);

    return (
      <li
        key={catId}
        onClick={() => navigate(`/category/${catId}`)}
        style={{ cursor: "pointer", color: "green" }}
      >
        {catObj?.name}
      </li>
    );
  })}
</ul>
    </div>
  );
}