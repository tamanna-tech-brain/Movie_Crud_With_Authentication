import { useEffect, useState } from "react";
import { getCastById } from "../api/api";
import { useParams } from "react-router-dom";

const CastDetails = () => {
  const { id } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getCastById(id).then(res => setCast(res.data.data));
  }, []);

  if (!cast) return <p>Loading...</p>;

  return (
    <div>
      <h2>{cast.name}</h2>
      <img src={cast.image} width="200" alt="" />
      <p>{cast.bio}</p>
      <p>Age: {cast.age}</p>
    </div>
  );
};

export default CastDetails;