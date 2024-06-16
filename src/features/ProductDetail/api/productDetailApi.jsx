import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const onGetProduct = async (id) => {
  const response = await axiosClient.get("product", {
    params: {
      id: id,
    },
  });

  return response.data;
};

export const GetProductDetailRequest = (id) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return onGetProduct(id);
    },
  });

  return query;
};
