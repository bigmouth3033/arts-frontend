import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
const requestAllReview = async (productId, pageNumber, pageSize, star) => {
  const response = await axiosClient.get("review/allReview", {
    params: { productId, pageNumber, pageSize, star },
  });
  return response.data;
};

export function RequestAllReview(productId, pageNumber, pageSize, star) {
  return useQuery({
    queryKey: ["allReview", productId, pageNumber, pageSize, star],
    queryFn: () => {
      return requestAllReview(productId, pageNumber, pageSize, star);
    },
  });
}
