import type { ProductType } from "../types/productType";

export const convertProductsListResponse = (
  productsList: string[]
): ProductType[] => {
  const domainProducts = productsList.map((product) => {
    return {
      id: product.replaceAll(" ", ""),
      name: product,
    };
  });
  return domainProducts;
};
