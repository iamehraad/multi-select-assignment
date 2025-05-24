import { screen } from "@testing-library/react";
import ProductListItem from "./ProductListItem";
import { ProductListItemProps } from "../../../../domain/types/components/ProductListItemTypes";
import { renderWithProviders } from "../../../../domain/utils/redux-test-provider";
import { ProductSliceStatesType } from "../../../../domain/types/redux/ProductSliceTypes";
import { LoadingEnum } from "../../../../domain/types/commonTypes";
import userEvent from "@testing-library/user-event";

describe("Product list item", () => {
  const defaultProduct = { id: "1", name: "Jest sample product" };
  const defaultTestId = "product-list-item";

  const setup = ({
    componentProps,
    productState,
  }: {
    componentProps: ProductListItemProps;
    productState?: ProductSliceStatesType;
  }) => {
    const { store } = renderWithProviders(
      <ProductListItem {...componentProps} />,
      {
        preloadedState: {
          product: productState ?? {
            productsList: [],
            selectedProducts: [],
            loadingStatus: LoadingEnum.IDLE,
            productsError: {
              fetchingProductsList: undefined,
            },
          },
        },
      },
    );
    return {
      wrapper: screen.getByTestId(defaultTestId),
      checkbox: screen.getByTestId(`${defaultTestId}-checkbox`),
      selectedBox: screen.getByTestId(`${defaultTestId}-checkbox-selected-box`),
      nameSpan: screen.getByTestId(`${defaultTestId}-product-name`),
      store,
    };
  };

  test("renders correctly", () => {
    const { wrapper, nameSpan, checkbox, selectedBox, store } = setup({
      componentProps: {
        product: defaultProduct,
        isProductSelected: false,
        listComponentStyle: { background: "inherit" },
        isVerySmallDevice: false,
        isMobile: false,
      },
    });
    expect(wrapper).toBeInTheDocument();
    expect(nameSpan).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(selectedBox).toBeInTheDocument();
    expect(selectedBox.firstChild).not.toBeInTheDocument();
    expect(nameSpan).toHaveTextContent("Jest sample product");
    expect(store.getState().product.selectedProducts).toStrictEqual([]);
  });

  test("renders selected blue box correctly", () => {
    const { selectedBox, store } = setup({
      componentProps: {
        product: defaultProduct,
        isProductSelected: true,
        listComponentStyle: { background: "inherit" },
        isVerySmallDevice: false,
        isMobile: false,
      },
      productState: {
        productsList: [defaultProduct],
        selectedProducts: [defaultProduct.id],
        loadingStatus: LoadingEnum.IDLE,
        productsError: {
          fetchingProductsList: undefined,
        },
      },
    });
    expect(selectedBox.firstChild).toBeInTheDocument();
    expect(selectedBox.firstChild).toHaveClass("bg-blue-600");
    expect(store.getState().product.selectedProducts).toStrictEqual(["1"]);
  });

  test("correctly triggers dispatch to select item and saves in redux", async () => {
    const { store, checkbox } = setup({
      componentProps: {
        product: defaultProduct,
        isProductSelected: true,
        listComponentStyle: { background: "inherit" },
        isVerySmallDevice: false,
        isMobile: false,
      },
      productState: {
        productsList: [defaultProduct],
        selectedProducts: [],
        loadingStatus: LoadingEnum.IDLE,
        productsError: {
          fetchingProductsList: undefined,
        },
      },
    });
    await userEvent.click(checkbox);
    expect(store.getState().product.selectedProducts).toStrictEqual(["1"]);
  });
});
