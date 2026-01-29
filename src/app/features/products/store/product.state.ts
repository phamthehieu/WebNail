export interface ProductState {
    products: any[];
    loading: boolean;
    error: any;
}

export const initialProductState: ProductState = {
    products: [],
    loading: false,
    error: null,
}