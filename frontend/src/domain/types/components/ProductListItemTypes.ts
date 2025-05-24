import type { ProductType } from "../productType";
import { CSSProperties } from "react";

export interface ProductListItemTypes {
  product: ProductType;
  isProductSelected: boolean;
  listComponentStyle: CSSProperties;
  isVerySmallDevice: boolean;
  isMobile: boolean;
}
