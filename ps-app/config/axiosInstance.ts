import axios from "axios";

const url = process.env.NEXT_PUBLIC_DB_URL;
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: url,
});

export default axiosInstance;