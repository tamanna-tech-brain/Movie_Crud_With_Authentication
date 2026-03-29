import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    await registerUser(form);
    alert("Registered");
    navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Username" onChange={e => setForm({...form,username:e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" onChange={e => setForm({...form,password:e.target.value})}/>

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}