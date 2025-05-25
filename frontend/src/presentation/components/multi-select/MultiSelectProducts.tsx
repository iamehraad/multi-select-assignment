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
import ProductList from "./product-list/ProductList";
import CommonButton from "../common/common-button/CommonButton";

const MultiSelectProducts = () => {
  const defaultDataTestId = "multi-select-products";
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedValue = useDebounce(searchQuery, 500);
  const dispatch = useAppDispatch();
  const { productsList, selectedProducts, loadingStatus, productsError } =
    useAppSelector(selectProduct);

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = () => {
    dispatch(fetchProductsAsync());
    dispatch(setSelectedProductsFromSessionStorage());
  };

  const clearProductSelection = () => {
    dispatch(clearSelectedProductList());
    setSearchQuery("");
  };

  return (
    <div
      className="bg-gray-50 rounded-lg border border-gray-200 p-6 w-full max-w-md mx-auto md:h-auto"
      data-testid={defaultDataTestId}
    >
      <h2
        className="text-xl font-medium text-gray-800 mb-4 break-words"
        data-testid={`${defaultDataTestId}-title`}
      >
        Productgroep
      </h2>

      <div data-testid={`${defaultDataTestId}-input-wrapper`}>
        <SearchInput
          isDisabled={!!productsError.fetchingProductsList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="min-h-40">
        {loadingStatus === LoadingEnum.LOADING ? (
          <div
            className="p-4 text-center text-gray-500"
            data-testid={`${defaultDataTestId}-loading`}
          >
            Loading items...
          </div>
        ) : (
          !productsError.fetchingProductsList && (
            <ProductList
              productsList={productsList}
              selectedProducts={selectedProducts}
              searchQuery={debouncedValue}
            />
          )
        )}
      </div>

      {productsError.fetchingProductsList ? (
        <CommonButton
          onClick={fetchProductsList}
          dataTestId={"retry"}
          className={
            "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
          }
        >
          <span className={"text-center"}>
            {productsError.fetchingProductsList.message}. Retry fetching data
          </span>
        </CommonButton>
      ) : (
        <CommonButton
          onClick={clearProductSelection}
          dataTestId={"clear"}
          className={
            "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
          }
        >
          <span className={"text-center"}>Toepassen / Clear</span>
        </CommonButton>
      )}
    </div>
  );
};

export default MultiSelectProducts;
