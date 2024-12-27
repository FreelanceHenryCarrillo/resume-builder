import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

// Función para subir el archivo
export const postFileFn = async (
  file: File | undefined,
  bucketName: string,
  idUser: number
) => {
  if (!file && !bucketName && !idUser) return;
  const getToken = window.localStorage.getItem("token");

  if (file) {
    const response = await axios.post(
      "/file",
      { file, bucketName, idUser },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
 
    console.log(response.data.url)
    return response.data.url;
  } else {
    console.error("No se ha seleccionado un archivo.");
  }
};

// Hook con useMutation
export const usePostFile = (
  file: File | undefined,
  bucketName: string,
  idUser: number
) => {
  // Usamos useMutation para realizar la carga del archivo
  const {
    mutate,
    data: fileResponse,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: () => postFileFn(file, bucketName, idUser),
  });

  // Llamamos a mutate cuando el archivo esté disponible
  useEffect(() => {
    if (file) {
      mutate();
    }
  }, [file, mutate]);

  return { fileResponse, loading, error };
};
