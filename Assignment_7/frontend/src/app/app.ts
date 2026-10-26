import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product, ProductService } from './services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Product Service Assignment');
  private productService = inject(ProductService);
  products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    this.productService.addProduct({
      name: 'keyboard',
      price: 1300
    })

    this.loadProducts();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);

    this.loadProducts();
  }

  updateProduct(id: number) {
    this.productService.updateProduct(id, {
      price: 2300
    })

    this.loadProducts();
  }


}
