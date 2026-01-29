import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { loadProducts } from '../../store/product.actions';
import { selectLoading, selectProducts } from '../../store/product.selectors';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(loadProducts());
  }
}

