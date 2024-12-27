import { IResume } from "@/interfaces/SResume";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const fetchFile = async (idFile: string, bucketName: string) => {
  const getToken = window.localStorage.getItem("token");

  const response = await axios.get<IResume[], AxiosResponse<IResume[]>>(
    `/file?idFile=${idFile}?bucketName=${bucketName}`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return response.data;
};

export const usefetchFile = (idFile: string, bucketName: string) => {
  const {
    error,
    isPending: loading,
    data: file,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["FILE", idFile, bucketName],
    queryFn: () => fetchFile(idFile, bucketName),
  });

  return { file, loading, error };
};
