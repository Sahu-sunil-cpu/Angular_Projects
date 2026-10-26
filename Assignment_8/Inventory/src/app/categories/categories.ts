
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../Interfaces/category';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  private categoryService = inject(CategoryService);
  private toastr = inject(ToastrService);

  categoryName = '';
  categoryDescription = '';
  editingId: string | null = null;

  get categories(): Category[] {
    return this.categoryService.categories();
  }

  saveCategory(): void {
    if (!this.categoryName.trim()) {
      this.toastr.warning('Please enter a category name.');
      return;
    }

    if (this.editingId) {
      const category: Category = {
        id: this.editingId,
        name: this.categoryName,
        description: this.categoryDescription,
        createdAt:
          this.categories.find(item => item.id === this.editingId)?.createdAt ??
          new Date().toISOString()
      };

      const updated = this.categoryService.updateCategory(category);

      if (!updated) {
        this.toastr.error('A category with this name already exists.');
        return;
      }

      this.toastr.success('Category updated successfully.');
    } else {
      const added = this.categoryService.addCategory({
        name: this.categoryName,
        description: this.categoryDescription
      });

      if (!added) {
        this.toastr.error('A category with this name already exists.');
        return;
      }

      this.toastr.success('Category added successfully.');
    }

    this.resetForm();
  }

  editCategory(category: Category): void {
    this.editingId = category.id;
    this.categoryName = category.name;
    this.categoryDescription = category.description;
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id);
      this.toastr.success('Category deleted successfully.');

      if (this.editingId === id) {
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.categoryName = '';
    this.categoryDescription = '';
    this.editingId = null;
  }
}
