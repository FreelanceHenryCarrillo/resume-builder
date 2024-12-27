import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/user";

const useLogout = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onLogout = () => {
    window.localStorage.removeItem("token");

    setAuth(null, false);
    navigate("/auth/sign-in");
  };

  return {
    onLogout,
  };
};

export default useLogout;
