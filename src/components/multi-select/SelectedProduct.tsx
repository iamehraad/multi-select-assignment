import type { ProductType } from "../../domain/types/ProductType";

interface Props {
  item: ProductType;
  toggleItem: (item: ProductType) => void;
}

const SelectedProduct = ({ item, toggleItem }: Props) => {
  return (
    <div
      key={item.id}
      className="bg-gray-100 rounded-md px-2 py-1 flex items-center gap-1 text-sm"
    >
      <span>{item.name}</span>
      {/*TODO: Add proper icon*/}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleItem(item);
        }}
        className="text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
};

export default SelectedProduct;
