import { ProductType } from "../../../../domain/types/productType";
import ProductListItem from "../product-list-item/ProductListItem";
import { FixedSizeList as List } from "react-window";
import { memo } from "react";
import { usePlatform } from "../../../hooks/usePlatform";
import { ProductListProps } from "../../../../domain/types/components/ProductListTypes";

const ProductList = memo(
  ({ productsList, selectedProducts, searchQuery }: ProductListProps) => {
    const defaultTestId = "product-list";
    const { windowHeight, isMobile, isDesktop, isVerySmallDevice } =
      usePlatform();

    const filteredItems = () => {
      const filteredSelectedItems: ProductType[] = [];
      const filteredUnselectedItems: ProductType[] = [];

      productsList.forEach((item) => {
        if (selectedProducts.includes(item.id)) {
          filteredSelectedItems.push(item);
        } else if (
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          filteredUnselectedItems.push(item);
        }
      });

      return {
        unselectedProducts: filteredUnselectedItems,
        allProducts: [...filteredSelectedItems, ...filteredUnselectedItems],
      };
    };

    const getItemSize = () => {
      if (isVerySmallDevice) {
        return 90;
      }
      if (isMobile) {
        return 60;
      }
      return 50;
    };

    const getReservedHeightSpace = () => {
      if (!isDesktop && windowHeight > 600) return 400;
      if (windowHeight < 700) return 100;
      return 500;
    };

    const getListHeight = () => {
      const itemSize = getItemSize();
      const itemCount = allProducts.length;
      const calculatedHeight = itemCount * itemSize;
      const minHeight = itemSize * 2;
      const maxHeight = windowHeight - getReservedHeightSpace();
      return Math.max(minHeight, Math.min(calculatedHeight, maxHeight));
    };

    const { unselectedProducts, allProducts } = filteredItems();
    return (
      <div data-testid={defaultTestId}>
        <List
          height={getListHeight()}
          itemCount={allProducts.length}
          itemSize={getItemSize()}
          width="100%"
          style={{ overflowX: "hidden" }}
        >
          {({ index, style }) => (
            <ProductListItem
              isProductSelected={
                !!selectedProducts.find(
                  (productId) => productId === allProducts[index].id,
                )
              }
              product={allProducts[index]}
              listComponentStyle={style}
              isVerySmallDevice={isVerySmallDevice}
              isMobile={isMobile}
            />
          )}
        </List>
        {!unselectedProducts.length && (
          <div data-testid={`${defaultTestId}-no-item`}>
            <div
              className={"w-full h-0.5 my-4 bg-gray-400"}
              data-testid={`${defaultTestId}-no-item-divider`}
            />
            <p
              className="p-4 text-center text-red-500"
              data-testid={`${defaultTestId}-no-item-text`}
            >
              No item to be selected
            </p>
          </div>
        )}
      </div>
    );
  },
);

export default ProductList;
