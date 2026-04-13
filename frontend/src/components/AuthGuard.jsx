import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuard = ({ roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthGuard;