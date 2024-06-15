import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

const admin = async () => {
  const response = await axiosClient.get("auth/admin");
  return response.data;
};

export const AdminRequest = () => {
  const query = useQuery({
    queryKey: ["admin"],
    queryFn: admin,
    retry: 0,
  });

  return query;
};
