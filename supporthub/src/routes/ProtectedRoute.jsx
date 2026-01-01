import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/login" />;

  if (role && auth.user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
