import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../domain/utils/redux-test-provider";
import { ProductSliceStatesType } from "../../../../domain/types/redux/ProductSliceTypes";
import { LoadingEnum } from "../../../../domain/types/commonTypes";
import ProductList from "./ProductList";
import { ProductListProps } from "../../../../domain/types/components/ProductListTypes";
import { mockData } from "../../../../domain/utils/mockTestData";

const { mockedProducts } = mockData;

describe("Product list", () => {
  const defaultTestId = "product-list";

  const setup = ({
    componentProps,
    productState,
  }: {
    componentProps: ProductListProps;
    productState?: ProductSliceStatesType;
  }) => {
    const { store } = renderWithProviders(<ProductList {...componentProps} />, {
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
    });
    return {
      listItems: screen.queryAllByTestId(`${defaultTestId}-item`),
      selectedBoxes: screen.queryAllByTestId(
        `${defaultTestId}-item-checkbox-selected-blue-box`,
      ),
      noItem: screen.queryByTestId(`${defaultTestId}-no-item`),
      noItemDivider: screen.queryByTestId(`${defaultTestId}-no-item-divider`),
      noItemText: screen.queryByTestId(`${defaultTestId}-no-item-text`),
      store,
    };
  };

  test("renders correctly", () => {
    const { listItems, noItem } = setup({
      componentProps: {
        productsList: mockedProducts,
        selectedProducts: [],
        searchQuery: "",
      },
    });
    expect(listItems).toHaveLength(2);
    expect(noItem).not.toBeInTheDocument();
  });

  test("renders no item message", () => {
    const { listItems, noItem, noItemText, noItemDivider } = setup({
      componentProps: {
        productsList: [],
        selectedProducts: [],
        searchQuery: "",
      },
    });
    expect(listItems).toHaveLength(0);
    expect(noItem).toBeInTheDocument();
    expect(noItemDivider).toBeInTheDocument();
    expect(noItemText).toBeInTheDocument();
    expect(noItemText).toHaveTextContent("No item to be selected");
  });

  test("renders no item message and shows selected items", () => {
    const { listItems, noItem, noItemText, noItemDivider, selectedBoxes } =
      setup({
        componentProps: {
          productsList: mockedProducts,
          selectedProducts: mockedProducts.map(({ id }) => id),
          searchQuery: "",
        },
      });
    expect(listItems).toHaveLength(2);
    expect(selectedBoxes).toHaveLength(2);
    expect(noItem).toBeInTheDocument();
    expect(noItemDivider).toBeInTheDocument();
    expect(noItemText).toBeInTheDocument();
    expect(noItemText).toHaveTextContent("No item to be selected");
  });

  test("No item renders if nothing matches search query", () => {
    const { listItems, noItem, noItemText, noItemDivider } = setup({
      componentProps: {
        productsList: mockedProducts,
        selectedProducts: [],
        searchQuery: "something that doesnt exist",
      },
    });
    expect(listItems).toHaveLength(0);
    expect(noItem).toBeInTheDocument();
    expect(noItemDivider).toBeInTheDocument();
    expect(noItemText).toBeInTheDocument();
    expect(noItemText).toHaveTextContent("No item to be selected");
  });

  test("correctly show searched item", () => {
    const { listItems, noItem } = setup({
      componentProps: {
        productsList: mockedProducts,
        selectedProducts: [],
        searchQuery: "search",
      },
    });
    expect(listItems).toHaveLength(1);
    expect(noItem).not.toBeInTheDocument();
  });

  test("correctly show searched item with all uppercase search query", () => {
    const { listItems, noItem } = setup({
      componentProps: {
        productsList: mockedProducts,
        selectedProducts: [],
        searchQuery: "SEARCH",
      },
    });
    expect(listItems).toHaveLength(1);
    expect(noItem).not.toBeInTheDocument();
  });

  test("correctly show searched item while having shared characters", () => {
    const { listItems, noItem } = setup({
      componentProps: {
        productsList: mockedProducts,
        selectedProducts: [],
        searchQuery: "product",
      },
    });
    expect(listItems).toHaveLength(2);
    expect(noItem).not.toBeInTheDocument();
  });
});
