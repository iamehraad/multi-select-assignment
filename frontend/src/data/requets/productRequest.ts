import { apiUrls } from "../urls";

export const fetchProductsList = async (): Promise<string[]> => {
  const response = await fetch(apiUrls.productsList);
  if (!response.ok) {
    const errorBody = await response.json();
    throw {
      message: errorBody?.message || "Something went wrong!",
    };
  }
  const json = await response.json();
  return json.data;
};
