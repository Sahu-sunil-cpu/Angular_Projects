
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import {
  Product,
  ProductsResponse
} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'https://assignmet-1.onrender.com/api/products/';

  getProducts(): Observable<Product[]> {  // use Observeable<Product[]>, since HttpClient returns RxJS observables
    return this.http
      .get<ProductsResponse>(this.apiUrl)
      .pipe(map(response => response.data));
  }
}
