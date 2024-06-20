import axiosClient from "@/shared/api/axiosClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const readCustomerProducts = async (
  categoryId,
  pageSize,
  pageNumber,
  sort,
  searchValue
) => {
  const response = await axiosClient.get("product/listing-page", {
    params: {
      categoryId: categoryId,
      pageSize: pageSize,
      pageNumber: pageNumber,
      sort: sort,
      searchValue: searchValue,
    },
  });

  return response.data;
};

export const ReadCustomerProductsRequest = (
  categoryId,
  pageSize,
  sort,
  searchValue
) => {
  const query = useInfiniteQuery({
    queryKey: ["CustomerProducts", categoryId, pageSize, sort, searchValue],
    queryFn: ({ pageParam = 1 }) => {
      return readCustomerProducts(
        categoryId,
        pageSize,
        pageParam,
        sort,
        searchValue
      );
    },
    intialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext == true) {
        return lastPage.currentPage + 1;
      } else {
        return null;
      }
    },
  });

  return query;
};
