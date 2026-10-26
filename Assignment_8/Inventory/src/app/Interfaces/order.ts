
export interface OrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    items: OrderItem[];
    total: number;
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
    createdAt: string;
}
