import axiosAdmin from "@/shared/api/axiosAdmin";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const onGetAminProducts = async (pageNumber, pageSize, categoryId, searchValue) => {
  let categoryStr = "";
  categoryId.forEach((item) => (categoryStr += `&categoryId=${item}`));

  const response = await axiosAdmin.get(
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

const updateVariants = async (payload) => {
  const response = await axiosAdmin.put("product/update-variants", payload);
  return response.data;
};

export const UpdateVariantRequest = () => {
  return useMutation({
    mutationFn: updateVariants,
  });
};
