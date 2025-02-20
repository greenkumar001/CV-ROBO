// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://13.203.182.70:9090",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
