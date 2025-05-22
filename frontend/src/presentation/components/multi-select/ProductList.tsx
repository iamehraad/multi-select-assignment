import { ProductType } from "../../../domain/types/productType";
import ProductListItem from "./ProductListItem";
import { FixedSizeList as List } from "react-window";
import { CSSProperties, useMemo } from "react";
import { usePlatform } from "../../hooks/usePlatform";

interface Props {
  productsList: ProductType[];
  selectedProducts: string[];
  searchQuery: string;
}

export const ProductList = ({
  productsList,
  selectedProducts,
  searchQuery,
}: Props) => {
  const { windowHeight, isMobile, isVerySmallDevice } = usePlatform();

  const filteredItems = useMemo(() => {
    const filteredSelectedItems: ProductType[] = [];
    const filteredUnselectedItems: ProductType[] = [];

    productsList.forEach((item) => {
      if (selectedProducts.includes(item.id)) {
        filteredSelectedItems.push(item);
      } else if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        filteredUnselectedItems.push(item);
      }
    });

    return {
      unselectedList: filteredUnselectedItems,
      products: [...filteredSelectedItems, ...filteredUnselectedItems],
    };
  }, [productsList, selectedProducts, searchQuery]);

  const getItemSize = () => {
    if (isVerySmallDevice) {
      return 90;
    }
    if (isMobile) {
      return 60;
    }
    return 50;
  };

  const renderRow = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const product = products[index];
    const isSelected = !!selectedProducts.find(
      (productId) => productId === product.id,
    );

    return (
      <ProductListItem
        isProductSelected={isSelected}
        product={product}
        listComponentStyle={style}
        isVerySmallDevice={isVerySmallDevice}
        isMobile={isMobile}
      />
    );
  };

  const { unselectedList, products } = filteredItems;
  return (
    <div>
      <List
        height={windowHeight - 400}
        itemCount={products.length}
        itemSize={getItemSize()}
        width="100%"
        style={{ overflowX: "hidden" }}
        children={renderRow}
      />
      {!unselectedList.length && (
        <div className="p-4 text-center text-red-500 flex-grow">
          No item matches your search criteria!
        </div>
      )}
    </div>
  );
};
