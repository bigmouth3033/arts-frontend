import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const createProduct = async (payload) => {
  const response = axiosClient.post("product/new", payload);
  return response.data;
};

export const CreateProductRequest = () => {
  const mutation = useMutation({
    mutationFn: createProduct,
  });

  return mutation;
};
