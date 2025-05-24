import type {ProductType} from "../types/productType";

export const convertProductsListResponse = (
  productsList: string[]
): ProductType[] => {
    return productsList.map((product, index) => {
      return {
          id: product.replaceAll(" ", "") + index,
          name: product,
      };
  });
};
