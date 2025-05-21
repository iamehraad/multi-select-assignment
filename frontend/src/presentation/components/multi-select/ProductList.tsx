import { ProductType } from "../../../domain/types/productType";
import ProductListItem from "./ProductListItem";
import { FixedSizeList as List } from "react-window";
import { CSSProperties } from "react";

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

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const product = listOfProducts[index];
    const isSelected = !!selectedProducts.find(
      (productId) => productId === product.id,
    );

    return (
      <ProductListItem
        isProductSelected={isSelected}
        product={product}
        listComponentStyle={style}
      />
    );
  };

  return (
    <List
      height={300}
      itemCount={listOfProducts.length}
      itemSize={40}
      width="100%"
    >
      {renderRow}
    </List>
  );
};
