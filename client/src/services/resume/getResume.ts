import { IResume } from "@/interfaces/SResume";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const fetchResumes = async () => {
  const getToken = window.localStorage.getItem("token");

  const response = await axios.get<IResume[], AxiosResponse<IResume[]>>(
    `/resume`,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
  );

  return response.data;
};

export const useResumes = () => {
  const {
    error,
    isPending: loading,
    data: resumes,
  } = useQuery({
    queryKey: ["RESUMES"],
    queryFn: fetchResumes,
  });

  return { resumes, loading, error };
};

export const fetchResumeById = async (id: number) => {
  const response = await axios.get<IResume, AxiosResponse<IResume>>(
    `/resume/${id}`
  );

  return response.data;
};

export const useDetailResume = (id: number) => {
  const {
    error,
    isPending: loading,
    data: resume,
  } = useQuery({
    queryKey: ["RESUMES_DETAIL", id],
    queryFn: () =>  fetchResumeById(id),
  });

  return { resume, loading, error };
};
