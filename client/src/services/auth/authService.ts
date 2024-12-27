import { IToken } from "@/interfaces/SResume";
import { axios } from "@/lib/axios";
import { AxiosResponse } from "axios";

export const LoginAuth = async (
  email: string,
  password: string
): Promise<IToken> => {
  const response = await axios.post<IToken, AxiosResponse<IToken>>(
    `/users/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};
