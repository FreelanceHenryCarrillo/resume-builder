import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import GenericDialog from "./components/ui/dialog/GenericDialog";
import { useAuthStore } from "./store/user";

function App() {
  const { isAuthenticated, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setAuth(token, true);
    }
    setIsLoading(false);
  }, [setAuth, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Outlet />
      <Toaster />
      <GenericDialog />
    </div>
  );
}

export default App;
