import { createReducer, on } from "@ngrx/store";
import { initialProductState } from "./product.state";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./product.actions";

export const productReducer = createReducer(
    initialProductState,

    on(loadProducts, (state) => ({ ...state, loading: true })),
    on(loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
    on(loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),
)   