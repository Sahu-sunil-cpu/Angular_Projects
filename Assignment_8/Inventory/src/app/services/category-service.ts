
import { Injectable, inject, signal } from '@angular/core';
import { Category } from '../Interfaces/category';
import { StorageService } from './storage-service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private storageService = inject(StorageService);

    private storageKey = 'inventory_categories';

    categories = signal<Category[]>(
        this.storageService.getData<Category[]>(this.storageKey, [])
    );

    private saveCategories(): void {
        this.storageService.saveData(
            this.storageKey,
            this.categories()
        );
    }

    getCategories(): Category[] {
        return this.categories();
    }

    addCategory(category: Omit<Category, 'id' | 'createdAt'>): boolean {
        const nameExists = this.categories().some(
            item => item.name.trim().toLowerCase() === category.name.trim().toLowerCase()
        );

        if (nameExists) {
            return false;
        }

        const newCategory: Category = {
            id: crypto.randomUUID(),
            name: category.name.trim(),
            description: category.description.trim(),
            createdAt: new Date().toISOString()
        };

        this.categories.update(items => [...items, newCategory]);
        this.saveCategories();

        return true;
    }

    updateCategory(updatedCategory: Category): boolean {
        const nameExists = this.categories().some(
            item =>
                item.id !== updatedCategory.id &&
                item.name.trim().toLowerCase() === updatedCategory.name.trim().toLowerCase()
        );

        if (nameExists) {
            return false;
        }

        this.categories.update(items =>
            items.map(item =>
                item.id === updatedCategory.id
                    ? {
                        ...updatedCategory,
                        name: updatedCategory.name.trim(),
                        description: updatedCategory.description.trim()
                    }
                    : item
            )
        );

        this.saveCategories();
        return true;
    }

    deleteCategory(id: string): void {
        this.categories.update(items =>
            items.filter(item => item.id !== id)
        );

        this.saveCategories();
    }
}
