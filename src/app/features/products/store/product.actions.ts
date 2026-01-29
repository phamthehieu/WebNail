import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction('[Products] Load');

export const loadProductsSuccess = createAction('[Products] Load Success', props<{ products: any[] }>());

export const loadProductsFailure = createAction('[Products] Load Failure', props<{ error: any }>());
