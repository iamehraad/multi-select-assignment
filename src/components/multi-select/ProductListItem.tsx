import type { ProductType } from "../../domain/types/ProductType";
import { toggleItemFromSelectedList } from "../../domain/store/slices/ProductSlice";
import { useAppDispatch } from "../../domain/utils/dispatch";

interface Props {
  product: ProductType;
  selectedProducts: string[];
}

const ProductListItem = ({ product, selectedProducts }: Props) => {
  const dispatch = useAppDispatch();

  const isSelected = !!selectedProducts.find(
    (productId) => productId === product.id,
  );

  const toggleItem = (id: string) => {
    dispatch(toggleItemFromSelectedList(id));
  };

  return (
    <div className="flex items-center py-2">
      <label className="flex items-center cursor-pointer w-full">
        <div className="w-6 h-6 mr-2 relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleItem(product.id)}
            className="opacity-0 absolute h-6 w-6 cursor-pointer"
          />
          <div
            className={'border bg-white border-gray-300 w-6 h-6 rounded p-0.5'}
          >
            {isSelected && (
              <div
                className={'bg-blue-600 border-blue-600 rounded w-full h-full'}
              />
            )}
          </div>
        </div>
        <span
          className={`font-medium ${isSelected ? "text-blue-600" : "text-gray-800"}`}
        >
          {product.name}
        </span>
      </label>
    </div>
  );
};

export default ProductListItem;
