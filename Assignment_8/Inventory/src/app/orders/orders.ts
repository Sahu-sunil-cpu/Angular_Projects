
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../Interfaces/order';
import { ProductService } from '../services/product-service';
import { OrderService } from '../services/order-service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private toastr = inject(ToastrService);

  customerName = '';
  selectedProductId = '';
  quantity = 1;

  get products() {
    return this.productService.products();
  }

  get orders(): Order[] {
    return this.orderService.orders();
  }

  get selectedProduct() {
    return this.productService.getProductById(this.selectedProductId);
  }

  get orderTotal(): number {
    return (this.selectedProduct?.price ?? 0) * this.quantity;
  }

  createOrder(): void {
    if (!this.customerName.trim()) {
      this.toastr.warning('Please enter the customer name.');
      return;
    }

    const product = this.selectedProduct;

    if (!product) {
      this.toastr.warning('Please select a product.');
      return;
    }

    if (!Number.isInteger(this.quantity) || this.quantity < 1) {
      this.toastr.warning('Quantity must be at least 1.');
      return;
    }

    if (this.quantity > product.stock) {
      this.toastr.error('Not enough stock available.');
      return;
    }

    this.orderService.addOrder({
      customerName: this.customerName.trim(),
      items: [
        {
          productId: product._id,
          productName: product.name,
          price: product.price,
          quantity: this.quantity
        }
      ],
      total: this.orderTotal,
      status: 'Pending'
    });

    this.productService.updateProduct({
      ...product,
      stock: product.stock - this.quantity
    });

    this.toastr.success('Order created successfully.');

    this.customerName = '';
    this.selectedProductId = '';
    this.quantity = 1;
  }

  updateStatus(order: Order, status: Order['status']): void {
    this.orderService.updateOrderStatus(order.id, status);
    this.toastr.success('Order status updated.');
  }

  deleteOrder(id: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id);
      this.toastr.success('Order deleted successfully.');
    }
  }
}
