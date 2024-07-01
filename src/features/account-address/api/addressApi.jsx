import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const createAddress = async (payload) => {
  const response = await axiosClient.post("address", payload);
  return response.data;
};

export const CreateAddressRequest = () => {
  return useMutation({
    mutationFn: createAddress,
  });
};

const getUserAddress = async () => {
  const response = await axiosClient.get("address");
  return response.data;
};

export const GetUserAddressRequest = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: getUserAddress,
  });
};
