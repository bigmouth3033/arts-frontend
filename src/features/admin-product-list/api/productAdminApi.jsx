import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const onGetAminProducts = async (pageNumber, pageSize) => {
  const response = await axiosClient.get("product/admin-products", {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
  });
  return response.data;
};

export const GetAdminProductRequest = (pageNumber, pageSize) => {
  const query = useQuery({
    queryKey: ["admin-product", pageNumber, pageSize],
    queryFn: () => {
      return onGetAminProducts(pageNumber, pageSize);
    },
  });

  return query;
};
