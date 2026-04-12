import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { loginUser } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async () => {
  try {
    const res = await loginUser({
      email,
      password
    });

    console.log("LOGIN RESPONSE:", res.data);

    // ✅ SAVE TOKEN
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.data._id);

    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <input
          ref={emailRef}
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
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;