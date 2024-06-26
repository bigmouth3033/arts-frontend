import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";

const getAdminOrders = async (pageNumber, pageSize) => {
  const response = await axiosAdmin.get("order/admin-orders", {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response.data;
};

export const GetAdminOrderRequest = (pageNumber, pageSize) => {
  return useQuery({
    queryKey: ["admin-orders", pageNumber, pageSize],
    queryFn: () => {
      return getAdminOrders(pageNumber, pageSize);
    },
  });
};
