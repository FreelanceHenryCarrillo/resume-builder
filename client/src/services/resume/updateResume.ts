import { IResume } from "@/interfaces/SResume";
import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

export const updateResume = async (data: IResume) => {
  const response = await axios.put<IResume, AxiosResponse<IResume>>(
    `/resume/${data.id}`,
    data
  );

  return response.data;
};

export const debouncedUpdateResume = debounce(updateResume, 500);

export const useUpdateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateResumeFn,
  } = useMutation({
    mutationFn: updateResume,
  });

  return { updateResume: updateResumeFn, loading, error };
};
