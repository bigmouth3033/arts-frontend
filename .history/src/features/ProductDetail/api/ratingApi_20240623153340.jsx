import axiosClient from "@/shared/api/axiosClient";

const requestRating = async()=>{
  const response = await axiosClient.post("/review")
}