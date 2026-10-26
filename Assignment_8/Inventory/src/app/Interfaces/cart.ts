import { Product } from './product';

export interface Cart {
    product: Product;
    quantity: number;
}

export interface CartResponse {
    success: boolean;
    data: Cart;
}
