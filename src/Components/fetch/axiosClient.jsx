import axios from "axios";
const url = "http://localhost:3001/api";
const axiosClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
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
export const get = (url, params) => axiosClient.get(url, { params });

export const post = (url, data) => axiosClient.post(url, data);
export const postWithQuery = (url, data, params) =>
  axiosClient.post(url, data, { params });
export default axiosClient;
