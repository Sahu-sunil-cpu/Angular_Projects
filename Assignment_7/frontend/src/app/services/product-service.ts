import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Headphones', price: 2000 }
  ];

  private nextId = 4;

  getProducts(): Product[] {
    return [...this.products];
  }

  addProduct(product: Omit<Product, 'id'>): void {
    this.products.push({
      id: this.nextId++,
      ...product
    });
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(
      product => product.id !== id
    );
  }

  updateProduct(
    id: number,
    updatedProduct: Partial<Omit<Product, 'id'>>
  ): void {
    this.products = this.products.map(product =>
      product.id === id
        ? { ...product, ...updatedProduct }
        : product
    );
  }
}
