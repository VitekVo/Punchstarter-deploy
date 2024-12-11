import axios from "axios";

const url = process.env.NEXT_PUBLIC_DB_URL;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:2580",
});

export default axiosInstance;
