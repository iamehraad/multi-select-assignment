import { ProductType } from "../../../domain/types/productType";
import ProductListItem from "./ProductListItem";

interface Props {
  listOfProducts: ProductType[];
  selectedProducts: string[];
}

export const ProductList = ({ listOfProducts, selectedProducts }: Props) => {
  if (!listOfProducts.length) {
    return (
      <div className="p-4 text-center text-red-500">
        No Product matches your search criteria!
      </div>
    );
  }
  return (
    <ul className="mb-4 overflow-auto max-h-96 pr-4">
      {listOfProducts.map((item) => (
        <li key={item.id}>
          <ProductListItem
            isProductSelected={
              !!selectedProducts.find((productId) => productId === item.id)
            }
            product={item}
          />
        </li>
      ))}
    </ul>
  );
};
