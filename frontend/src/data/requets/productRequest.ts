import { apiUrls } from "../urls";
import { axiosClient } from "../network";
import { isAxiosError } from "axios";

export const fetchProductsList = async (): Promise<string[]> => {
  try {
    const response = await axiosClient.get(apiUrls.productsList);
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw {
        message: error.response
          ? error.message || "Something went wrong!"
          : error.request
            ? "Server is not reactive."
            : "Something is really wrong!",
      };
    }
    throw { message: "Something is really wrong!" };
  }
};
