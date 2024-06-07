import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost",
});

axiosClient.interceptors.request.use((config) => {
  let token = sessionStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    token = localStorage.getItem("ACCESS_TOKEN");
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.status == 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("ACCESS_TOKEN");
    }
  }
);

export default axiosClient;
