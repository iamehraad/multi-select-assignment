import type { ProductType } from "../../../domain/types/productType";
import { toggleItemFromSelectedList } from "../../../domain/store/slices/product/productSlice";
import { useAppDispatch } from "../../../domain/utils/dispatch";
import { CSSProperties } from "react";

interface Props {
  product: ProductType;
  isProductSelected: boolean;
  listComponentStyle: CSSProperties;
  isVerySmallDevice: boolean;
  isMobile: boolean;
}

const ProductListItem = ({
  product,
  isProductSelected,
  listComponentStyle,
  isVerySmallDevice,
  isMobile,
}: Props) => {
  const dispatch = useAppDispatch();

  const toggleItem = () => {
    dispatch(toggleItemFromSelectedList(product.id));
  };

  return (
    <div style={listComponentStyle} className="flex items-center py-2">
      <label className="flex items-center cursor-pointer w-full focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-500 rounded px-1 py-1 ml-1 gap-4 flex-wrap">
        <input
          type="checkbox"
          checked={isProductSelected}
          onChange={toggleItem}
          className="sr-only"
        />
        <div
          className={"border bg-white border-gray-300 w-6 h-6 rounded p-0.5"}
        >
          {isProductSelected && (
            <div
              className={"bg-blue-600 border-blue-600 rounded w-full h-full"}
            />
          )}
        </div>
        <span
          className={`font-medium break-words truncate ${isProductSelected ? "text-blue-600" : "text-gray-800"} ${isVerySmallDevice ? "w-40" : isMobile ? "w-80" : "w-auto"} w-fit`}
        >
          {product.name}
        </span>
      </label>
    </div>
  );
};

export default ProductListItem;
