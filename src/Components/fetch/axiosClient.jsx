import apiConfig from "./axioConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.URL,
  headers: {
    "Content-Type": "application/json",
  },
  data: {},
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
