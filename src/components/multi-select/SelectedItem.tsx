import React from "react";
import type { SearchItemType } from "../../domain/types/SearchItemType";
import { SelectedItemComponentStyleEnum } from "../../domain/types/commonTypes";

interface Props {
  item: SearchItemType;
  toggleItem: (item: SearchItemType) => void;
  type: SelectedItemComponentStyleEnum;
}

const SelectedItem = ({ item, toggleItem, type }: Props) => {
  if (type === SelectedItemComponentStyleEnum.CHIP) {
    return (
      <div
        key={item.id}
        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
        onClick={() => toggleItem(item)}
      >
        <span>{item.name}</span>
        {/*TODO: Add proper icon*/}
        <span className="text-green-500">✓</span>
      </div>
    );
  }

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

export default SelectedItem;
