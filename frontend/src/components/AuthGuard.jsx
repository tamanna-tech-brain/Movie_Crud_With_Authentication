import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
};

export default AuthGuard;