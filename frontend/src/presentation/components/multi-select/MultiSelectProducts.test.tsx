import { screen, waitFor } from "@testing-library/react";
import MultiSelectProducts from "./MultiSelectProducts";
import { ProductSliceStatesType } from "../../../domain/types/redux/ProductSliceTypes";
import { renderWithProviders } from "../../../domain/utils/redux-test-provider";
import { LoadingEnum } from "../../../domain/types/commonTypes";
import { mockData } from "../../../domain/utils/mockTestData";
import AxiosMockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../data/network";
import { apiUrls } from "../../../data/urls";

const mockClient = new AxiosMockAdapter(axiosClient);

const { mockedProducts, mockResponse } = mockData;

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
          productsList: mockedProducts,
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
      searchInput: screen.queryByTestId("search-input"),
      loading: screen.queryByTestId(`${defaultDataTestId}-loading`),
      clearButton: screen.queryByTestId("common-button-clear"),
      retryButton: screen.queryByTestId("common-button-retry"),
      store,
    };
  };

  test("renders correctly", async () => {
    mockClient.onGet(apiUrls.productsList).reply(200, mockResponse);
    const {
      wrapper,
      inputWrapper,
      loading,
      clearButton,
      retryButton,
      searchInput,
    } = setup({
      productState: {
        productsList: [],
        selectedProducts: [],
        loadingStatus: LoadingEnum.IDLE,
        productsError: {
          fetchingProductsList: undefined,
        },
      },
    });

    await waitFor(() => expect(wrapper).toBeInTheDocument());

    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent("Toepassen / Clear");
    expect(inputWrapper).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
    expect(inputWrapper).not.toBeDisabled();
    expect(retryButton).not.toBeInTheDocument();
  });

  test("renders error message when API fails", async () => {
    mockClient.onGet(apiUrls.productsList).reply(500);
    const { wrapper, clearButton, searchInput } = setup({
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
    await waitFor(() => {
      const retryButton = screen.queryByTestId("common-button-retry");
      expect(wrapper).toBeInTheDocument();
      expect(searchInput).toBeDisabled();
      expect(clearButton).not.toBeDisabled();
      expect(retryButton).toBeInTheDocument();
      expect(retryButton).toHaveTextContent(
        "Request failed with status code 500. Retry fetching data",
      );
    });
  });

  test("show loading text", async () => {
    mockClient.onGet(apiUrls.productsList).reply(200);
    const { loading } = setup({
      productState: {
        productsList: [],
        selectedProducts: [],
        loadingStatus: LoadingEnum.LOADING,
        productsError: {
          fetchingProductsList: undefined,
        },
      },
    });

    await waitFor(() => {
      expect(loading).toBeInTheDocument();
      expect(loading).toHaveTextContent("Loading items...");
    });
  });
});
