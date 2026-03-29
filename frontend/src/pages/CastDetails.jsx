import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastById } from "../api/cast";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
export default function CastDetails() {
  const { id } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCast();
  }, [id]);

  const fetchCast = async () => {
    const res = await getCastById(id);
    setCast(res.data.data);
  };

  if (!cast) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{cast.name}</h1>
      <p><b>Age:</b> {cast.age}</p>
      <p>{cast.bio}</p>
      {cast.image && <img src={cast.image} width="200" />}
      <ul>
  {movie.cast?.map((cId) => {
    const castObj = casts.find(c => c._id === cId);

    return (
      <li
        key={cId}
        onClick={() => navigate(`/cast/${cId}`)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {castObj?.name}
      </li>
    );
  })}
</ul>
    </div>
  );
}