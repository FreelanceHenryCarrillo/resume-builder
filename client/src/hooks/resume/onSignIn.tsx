import { LoginAuth } from "@/services/auth/authService";
import { useAuthStore } from "@/store/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useSignIn = () => {
    const { setAuth } = useAuthStore();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useNavigate();
  

   const onSignIn = async(email: string , password: string) => {
    try {
        setLoading(true);
        const response = await LoginAuth(email, password);
        if (!response.token) {
          setErrorMessage(response.message);
          return;
        }
        setErrorMessage(null);
        window.localStorage.setItem("token", response.token);
        setAuth(response.token, true);
        router("/resume/dashboard");
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }


  return {
    onSignIn,
    errorMessage,
    loading
  };
};

export default useSignIn;
