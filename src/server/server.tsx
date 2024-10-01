// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.113:9090",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
