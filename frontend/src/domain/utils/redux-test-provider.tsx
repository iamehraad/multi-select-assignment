import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { productSlice } from "../store/slices/product/productSlice";

export function renderWithProviders(
  ui:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { product: productSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
