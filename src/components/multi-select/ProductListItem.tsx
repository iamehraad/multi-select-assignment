import type { ProductType } from "../../domain/types/ProductType";
import { toggleItemFromSelectedList } from "../../domain/store/slices/ProductSlice";
import { useAppDispatch } from "../../domain/utils/dispatch";

interface Props {
  product: ProductType;
  isProductSelected: boolean;
}

const ProductListItem = ({ product, isProductSelected }: Props) => {
  const dispatch = useAppDispatch();

  const toggleItem = () => {
    dispatch(toggleItemFromSelectedList(product.id));
  };

  return (
    <div className="flex items-center py-2">
      <label className="flex items-center cursor-pointer w-full">
        <div className="w-6 h-6 mr-2 relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={isProductSelected}
            onChange={toggleItem}
            className="opacity-0 absolute h-6 w-6 cursor-pointer"
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
        </div>
        <p
          className={`font-medium ${isProductSelected ? "text-blue-600" : "text-gray-800"}`}
        >
          {product.name}
        </p>
      </label>
    </div>
  );
};

export default ProductListItem;
