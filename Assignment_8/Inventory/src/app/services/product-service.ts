
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product, ProductResponse } from '../Interfaces/product';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageService = inject(StorageService);

  private storageKey = 'inventory_products';

  products = signal<Product[]>(
    this.storageService.getData<Product[]>(this.storageKey, [])
  );

  private saveProducts(): void {
    this.storageService.saveData(
      this.storageKey,
      this.products()
    );
  }

  getAllProducts(): Observable<ProductResponse> {
    return of({
      success: true,
      data: this.products()
    });
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(product => product._id === id);
  }

  addProduct(
    product: Omit<Product, '_id'>
  ): boolean {
    const newProduct: Product = {
      ...product,
      _id: crypto.randomUUID()
    };

    this.products.update(items => [...items, newProduct]);
    this.saveProducts();

    return true;
  }

  updateProduct(updatedProduct: Product): boolean {
    const exists = this.products().some(
      product => product._id === updatedProduct._id
    );

    if (!exists) {
      return false;
    }

    this.products.update(items =>
      items.map(product =>
        product._id === updatedProduct._id
          ? { ...updatedProduct }
          : product
      )
    );

    this.saveProducts();
    return true;
  }

  deleteProduct(id: string): void {
    this.products.update(items =>
      items.filter(product => product._id !== id)
    );

    this.saveProducts();
  }

  searchProducts(searchText: string): Product[] {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return this.products();
    }

    return this.products().filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }
}
