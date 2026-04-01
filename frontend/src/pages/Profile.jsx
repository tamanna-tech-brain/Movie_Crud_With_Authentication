import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, updateUserById } from "../api/api";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch user
  const fetchUser = async () => {
    try {
      const res = await getUserById(id);
      setUser(res.data.data);
      setUsername(res.data.data.username);
      setEmail(res.data.data.email);
    } catch (error) {
      alert("Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Update user
  const handleUpdate = async () => {
    try {
      const res = await updateUserById(id, {
        username,
        email,
      });
      setUser(res.data.data); // ✅ update UI instantly
    alert("Profile updated");
      fetchUser(); // refresh data
       navigate(`/profile/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>

      {user ? (
        <>
          <p><b>ID:</b> {user._id}</p>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <br />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />

          <button onClick={handleUpdate}>Update Profile</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;