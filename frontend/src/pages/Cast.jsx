import { useEffect, useState } from "react";
import { getCasts, deleteCast } from "../api/cast";
import CastForm from "./CastForm";

export default function Cast() {
  const [casts, setCasts] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetch = async () => {
    const res = await getCasts();
    setCasts(res.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1>Cast</h1>

      <CastForm existing={selected} refresh={fetch} />

      {casts.map((c) => (
        <div key={c._id}>
          <h3>{c.name}</h3>
          <button onClick={() => setSelected(c)}>Edit</button>
          <button onClick={() => deleteCast(c._id).then(fetch)}>Delete</button>
        </div>
      ))}
    </div>
  );
}