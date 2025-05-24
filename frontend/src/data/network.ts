import axios from "axios";
import { envConfig } from "./envConfig";

export const axiosClient = axios.create({
  baseURL: envConfig.backendUrl,
});
