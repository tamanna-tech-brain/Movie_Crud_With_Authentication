import { useEffect, useState } from "react";
import { getCategoryById } from "../api/api";
import { useParams } from "react-router-dom";
import "./category.css";

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getCategoryById(id)
      .then((res) => setCategory(res.data.data))
      .catch(() => alert("Error"));
  }, [id]);

  if (!category) return <p>Loading...</p>;

  return (
    <div className="cat-container">

      <div className="cat-details-card">
        <img
          src={`https://source.unsplash.com/800x400/?${category.name}`}
          alt={category.name}
        />

        <h2>{category.name}</h2>
        <p>{category.description}</p>
      </div>

    </div>
  );
};

export default CategoryDetails;