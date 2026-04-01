import { useEffect, useState } from "react";
import { getCategoryById } from "../api/api";
import { useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    getCategoryById(id)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch(() => {
        alert("Error fetching category");
      });
  }, []);

  if (!category) return <p>Loading...</p>;

  return (
    <div>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryDetails;