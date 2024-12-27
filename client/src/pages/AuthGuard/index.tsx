import { useAuthStore } from "@/store/user";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default AuthGuard;