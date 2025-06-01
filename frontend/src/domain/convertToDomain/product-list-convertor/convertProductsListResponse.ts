import type { ProductType } from "../../types/productType";

export const convertProductsListResponse = (
  productsList: string[],
): ProductType[] => {
  return productsList.map((product, index) => ({
    id: product.replaceAll(" ", "") + index,
    name: product,
  }));
};
