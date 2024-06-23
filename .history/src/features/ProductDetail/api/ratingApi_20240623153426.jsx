import axiosClient from "@/shared/api/axiosClient";

const requestRating = async (paload) => {
  const response = await axiosClient.post("review", paload);
  return response.data;
};

export default ffun