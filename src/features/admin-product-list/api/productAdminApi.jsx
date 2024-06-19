import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const onGetAminProducts = async (pageNumber, pageSize, categoryId, searchValue) => {
  let categoryStr = "";
  categoryId.forEach((item) => categoryStr + `&categoryId=${item}`);

  const response = await axiosClient.get(
    `product/admin-products?pageNumber=${pageNumber}&pageSize=${pageSize}${categoryStr}&searchValue=${searchValue}`
  );

  return response.data;
};

export const GetAdminProductRequest = (pageNumber, pageSize, categoryId, searchValue) => {
  const query = useQuery({
    queryKey: ["admin-product", pageNumber, pageSize, categoryId, searchValue],
    queryFn: () => {
      return onGetAminProducts(pageNumber, pageSize, categoryId, searchValue);
    },
  });

  return query;
};
