import {ProductType} from "../productType";
import {LoadingEnum} from "../commonTypes";

export interface ProductSliceStatesType {
    productsList: ProductType[];
    selectedProducts: string[];
    loadingStatus: LoadingEnum;
    productsError: {
        fetchingProductsList?: {
            status: number;
            message: string;
        };
    };
}