import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

export const axiosClient = axios.create({
  baseURL: baseUrl,
});
