
import { Injectable, inject, signal } from '@angular/core';
import { Order } from '../Interfaces/order';
import { StorageService } from './storage-service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private storageService = inject(StorageService);

    private storageKey = 'inventory_orders';

    orders = signal<Order[]>(
        this.storageService.getData<Order[]>(this.storageKey, [])
    );

    private saveOrders(): void {
        this.storageService.saveData(
            this.storageKey,
            this.orders()
        );
    }

    getOrders(): Order[] {
        return this.orders();
    }

    addOrder(
        order: Omit<Order, 'id' | 'createdAt'>
    ): void {
        const newOrder: Order = {
            ...order,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString()
        };

        this.orders.update(items => [newOrder, ...items]);
        this.saveOrders();
    }

    updateOrderStatus(
        id: string,
        status: Order['status']
    ): void {
        this.orders.update(items =>
            items.map(order =>
                order.id === id
                    ? { ...order, status }
                    : order
            )
        );

        this.saveOrders();
    }

    deleteOrder(id: string): void {
        this.orders.update(items =>
            items.filter(order => order.id !== id)
        );

        this.saveOrders();
    }
}
