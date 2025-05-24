import type { ProductType } from "../productType";
import { CSSProperties } from "react";

export interface ProductListItemProps {
  product: ProductType;
  isProductSelected: boolean;
  listComponentStyle: CSSProperties;
  isVerySmallDevice: boolean;
  isMobile: boolean;
}
