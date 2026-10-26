
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
  private toastr = inject(ToastrService);

  increase(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity + 1);

    this.toastr.success(
      'Product quantity increased.',
      'Cart Updated'
    );
  }

  decrease(productId: string, quantity: number): void {
    if (quantity <= 1) {
      this.toastr.info(
        'Use the Remove button to delete this product.',
        'Minimum Quantity'
      );
      return;
    }

    this.cartService.updateQuantity(productId, quantity - 1);

    this.toastr.info(
      'Product quantity decreased.',
      'Cart Updated'
    );
  }

  remove(productId: string): void {
    this.cartService.remove(productId);

    this.toastr.success(
      'Product removed from your cart.',
      'Removed'
    );
  }
}
