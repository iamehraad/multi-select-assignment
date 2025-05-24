import { screen, waitFor } from "@testing-library/react";
import MultiSelectProducts from "./MultiSelectProducts";
import { ProductSliceStatesType } from "../../../domain/types/redux/ProductSliceTypes";
import { renderWithProviders } from "../../../domain/utils/redux-test-provider";
import { LoadingEnum } from "../../../domain/types/commonTypes";
import axios from "axios";
import { mockData } from "../../../domain/utils/mockTestData";

jest.mock("axios");
const { mockedProducts } = mockData;

describe("Multi select product", () => {
  const defaultDataTestId = "multi-select-products";

  const setup = ({
    productState,
  }: {
    productState?: ProductSliceStatesType;
  }) => {
    const { store } = renderWithProviders(<MultiSelectProducts />, {
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
      wrapper: screen.getByTestId(defaultDataTestId),
      inputWrapper: screen.queryByTestId(`${defaultDataTestId}-input-wrapper`),
      searchInput: screen.queryByTestId('search-input'),
      loading: screen.queryByTestId(`${defaultDataTestId}-loading`),
      actionButton: screen.queryByTestId("common-button"),
      store,
    };
  };

  test("renders correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      response: {data: mockedProducts},
    });
    const { wrapper, inputWrapper, loading, actionButton, searchInput } = setup({
      productState: {
        productsList: mockedProducts,
        selectedProducts: [],
        loadingStatus: LoadingEnum.IDLE,
        productsError: {
          fetchingProductsList: undefined,
        },
      },
    });

    await waitFor(() => expect(wrapper).toBeInTheDocument());

    expect(actionButton).toBeInTheDocument();
    expect(inputWrapper).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
    expect(inputWrapper).not.toBeDisabled();
  });

  test("renders error message when API fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      data: null,
    });
    const { wrapper, actionButton, searchInput } = setup({
      productState: {
        productsList: [],
        selectedProducts: [],
        loadingStatus: LoadingEnum.IDLE,
        productsError: {
          fetchingProductsList: {
            status: 500,
            message: "Error",
          },
        },
      },
    });

    await waitFor(() => expect(wrapper).toBeInTheDocument());
    expect(searchInput).toBeDisabled();
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveTextContent("Something is really wrong!. Retry fetching data");
  });
});
