import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const userId = localStorage.getItem("userId");

  // ❌ Not logged in
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
};

export default AuthGuard;