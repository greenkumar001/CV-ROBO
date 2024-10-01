// utils/axiosInstance.js
import axios from "axios";

const axiosInstance1 = axios.create({
  baseURL: "http://192.168.0.113:9091",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance1;
