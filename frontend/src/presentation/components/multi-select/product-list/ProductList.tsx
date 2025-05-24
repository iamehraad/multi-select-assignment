import { ProductType } from "../../../../domain/types/productType";
import ProductListItem from "../product-list-item/ProductListItem";
import { FixedSizeList as List } from "react-window";
import { memo, useMemo } from "react";
import { usePlatform } from "../../../hooks/usePlatform";

interface Props {
  productsList: ProductType[];
  selectedProducts: string[];
  searchQuery: string;
}

const ProductList = memo(
  ({ productsList, selectedProducts, searchQuery }: Props) => {
    const { windowHeight, isMobile, isDesktop, isVerySmallDevice } = usePlatform();

    const filteredItems = useMemo(() => {
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

    const getListHeight = () => {
      const itemSize = getItemSize();
      const itemCount = allProducts.length;
      const calculatedHeight = itemCount * itemSize;
      const minHeight = itemSize * 2;
      const maxHeight = !isDesktop ? windowHeight - 400 : itemSize * 8;

      return Math.max(minHeight, Math.min(calculatedHeight, maxHeight));
    };

    const { unselectedProducts, allProducts } = filteredItems;
    return (
      <div>
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
          <div>
            <div className={"w-full h-0.5 my-4 bg-gray-400"} />
            <div className="p-4 text-center text-red-500">
              No item to be selected
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default ProductList;
