import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const login = async (payload) => {
  const response = await axiosClient.post("auth/admin-login", payload);
  return response.data;
};

export const AdminLoginRequest = () => {
  const mutation = useMutation({
    mutationFn: login,
  });

  return mutation;
};
