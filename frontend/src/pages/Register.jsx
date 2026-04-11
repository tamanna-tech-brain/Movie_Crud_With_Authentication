import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { registerUser } from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        alert("Fill all fields");
        return;
      }

      const res = await registerUser({
        username: name,
        email,
        password,
      });

      alert("✅ Registered successfully");

      localStorage.setItem("userId", res.data.data._id);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          ref={nameRef}
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
        >
          Register
        </button>

        <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;