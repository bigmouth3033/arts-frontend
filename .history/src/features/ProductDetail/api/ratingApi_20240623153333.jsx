import axiosClient from "@/shared/api/axiosClient";

const requestRating = async()=>{
  const response = await axiosClient.post("https://localhost:7279/api/review")
}