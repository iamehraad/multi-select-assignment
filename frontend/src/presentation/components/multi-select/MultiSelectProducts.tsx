import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../domain/utils/dispatch";
import {
  clearSelectedProductList,
  selectProduct,
  setSelectedProductsFromSessionStorage,
} from "../../../domain/store/slices/product/productSlice";
import { fetchProductsAsync } from "../../../domain/store/slices/product/productThunk";
import { LoadingEnum } from "../../../domain/types/commonTypes";
import SearchInput from "../form/inputs/SearchInput";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductList } from "./ProductList";

const MultiSelectProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery, 500);
  const dispatch = useAppDispatch();
  const { productsList, selectedProducts, status } =
    useAppSelector(selectProduct);

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = () => {
    try {
      dispatch(fetchProductsAsync());
      dispatch(setSelectedProductsFromSessionStorage());
    } catch (err) {
      console.error(err);
    }
  };

  const clearProductSelection = () => {
    dispatch(clearSelectedProductList());
    setSearchQuery("");
  };

  const filteredItems = () => {
    const filteredSelectedItems = productsList.filter((item) =>
      selectedProducts.includes(item.id)
    );
    const filteredUnselectedItems = productsList.filter(
      (item) =>
        !selectedProducts.includes(item.id) &&
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );
    return [...filteredSelectedItems, ...filteredUnselectedItems];
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 w-full max-w-md mx-auto md:h-auto">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Productgroep</h2>

      <div>
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {status === LoadingEnum.LOADING ? (
        <div className="p-4 text-center text-gray-500">Loading items...</div>
      ) : (
        <ProductList
          selectedProducts={selectedProducts}
          listOfProducts={filteredItems()}
        />
      )}

      <button
        onClick={clearProductSelection}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      >
        Toepassen
      </button>
    </div>
  );
};

export default MultiSelectProducts;
