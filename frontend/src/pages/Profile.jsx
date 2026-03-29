import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({});

  useEffect(() => {
    API.get(`/user/get/${userId}`)
      .then(res => setUser(res.data.data));
  }, []);

  const handleUpdate = async () => {
    await API.put(`/user/update/${userId}`, user);
    alert("Updated");
  };

  return (
    <div>
      <h2>Profile</h2>

      <input
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <input
        value={user.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        placeholder="New Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}