import { loginUser } from "../api";

function Login() {

  const handleLogin = () => {
    loginUser({ email, password })
      .then(data => {
        localStorage.setItem("token", data.token);
      });
  };

  return <button onClick={handleLogin}>Login</button>;
}

export default Login;