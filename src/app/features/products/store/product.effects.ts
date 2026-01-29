import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ApiService } from '../../../core/services/api.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(
    (
      actions$ = inject(Actions),
      api = inject(ApiService),
    ) =>
      actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() =>
          api.getProducts().pipe(
            map((products) =>
              ProductActions.loadProductsSuccess({ products })
            ),
            catchError((error) =>
              of(ProductActions.loadProductsFailure({ error }))
            )
          )
        )
      ),
    { functional: true }
  );
}
