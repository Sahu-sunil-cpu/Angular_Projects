
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product-service';
import { CategoryService } from '../services/category-service';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private orderService = inject(OrderService);

  get totalProducts(): number {
    return this.productService.products().length;
  }

  get totalCategories(): number {
    return this.categoryService.categories().length;
  }

  get totalOrders(): number {
    return this.orderService.orders().length;
  }

  get lowStockProducts(): number {
    return this.productService.products().filter(
      product => product.stock < 10
    ).length;
  }

  get totalInventoryValue(): number {
    return this.productService.products().reduce(
      (total, product) => total + product.price * product.stock,
      0
    );
  }
}
