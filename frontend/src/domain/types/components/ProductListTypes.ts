import {ProductType} from "../productType";

export interface ProductListProps {
    productsList: ProductType[];
    selectedProducts: string[];
    searchQuery: string;
}