import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const onUploadNewImage = async (payload) => {
  const response = await axiosClient.post("product/add-images", payload);
  return response.data;
};

export const UploadImageRequest = () => {
  return useMutation({
    mutationFn: onUploadNewImage,
  });
};

const onDeleteImage = async (payload) => {
  const response = await axiosClient.delete("product/remove-image", {
    params: {
      imageId: payload.imageId,
    },
  });
};

export const DeleteImageRequest = () => {
  return useMutation({
    mutationFn: onDeleteImage,
  });
};

const onGetProductAdmin = async (id) => {
  const response = await axiosClient.get("product/admin", {
    params: {
      id: id,
    },
  });

  return response.data;
};

export const GetProductAdminDetailRequest = (id) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return onGetProductAdmin(id);
    },
  });

  return query;
};
