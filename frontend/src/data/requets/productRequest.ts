import { apiUrls } from "../urls";

export const fetchProductsList = async (): Promise<string[]> => {
  try {
    const response = await fetch(apiUrls.productsList);
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};
