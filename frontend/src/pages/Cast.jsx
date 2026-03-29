import { useEffect, useState } from "react";
import { getCasts, deleteCast } from "../api/cast";
import CastForm from "./CastForm";

export default function Cast() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const res = await getCasts();
    setData(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Casts</h2>

      <CastForm existing={selected} refresh={fetchData} />

      {data.map((c) => (
        <div key={c._id}>
          {c.name}
          <button onClick={() => setSelected(c)}>Edit</button>
          <button onClick={() => deleteCast(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}