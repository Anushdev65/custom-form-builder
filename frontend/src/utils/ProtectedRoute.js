import { getLevelInfo } from "../localStorage/localStorage";
import { Navigate, Outlet } from "react-router-dom";

// Utility function to protect the route
const ProtectedRoute = () => {
  const token = getLevelInfo();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
