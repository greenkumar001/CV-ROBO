// utils/axiosInstance.js
import axios from "axios";

const axiosInstance1 = axios.create({
  baseURL: "http://13.203.182.70:9091",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance1;
