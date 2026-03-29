import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCastById } from "../api/cast";

export default function CastDetails() {
  const { id } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getCastById(id).then((res) => setCast(res.data.data));
  }, [id]);

  if (!cast) return <p>Loading...</p>;

  return <h2>{cast.name}</h2>;
}