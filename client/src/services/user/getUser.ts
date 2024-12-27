import { IResume } from "@/interfaces/SResume";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const fetchUser = async () => {
  const getToken = window.localStorage.getItem("token");

  const response = await axios.get<IResume[], AxiosResponse<IResume[]>>(
    `/user`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return response.data;
};

export const usefetchUser = () => {
  const {
    error,
    isPending: loading,
    data: user,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["USER"],
    queryFn: fetchUser,
  });

  return { user, loading, error };
};
