
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product as ProductModel } from '../Interfaces/product';
import { CategoryService } from '../services/category-service';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private toastr = inject(ToastrService);

  products: ProductModel[] = [];
  loading = false;

  searchText = '';
  currentPage = 1;
  pageSize = 5;

  editingId: string | null = null;

  name = '';
  category = '';
  price: number | null = null;
  stock: number | null = null;
  imageUrl = '';
  description = '';

  get categories(): string[] {
    return this.categoryService.categories().map(item => item.name);
  }

  get filteredProducts(): ProductModel[] {
    const query = this.searchText.trim().toLowerCase();

    return this.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
  }

  get paginatedProducts(): ProductModel[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getAllProducts().subscribe({
      next: response => {
        this.products = response.data;
        this.currentPage = 1;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Unable to load products.');
      }
    });
  }

  saveProduct(): void {
    if (!this.name.trim()) {
      this.toastr.warning('Please enter a product name.');
      return;
    }

    if (!this.category.trim()) {
      this.toastr.warning('Please select a category.');
      return;
    }

    if (this.price === null || this.price < 0) {
      this.toastr.warning('Please enter a valid price.');
      return;
    }

    if (this.stock === null || this.stock < 0 || !Number.isInteger(this.stock)) {
      this.toastr.warning('Stock must be a non-negative whole number.');
      return;
    }

    const productData: ProductModel = {
      _id: this.editingId ?? '',
      name: this.name.trim(),
      category: this.category,
      price: this.price,
      stock: this.stock,
      imageUrl: this.imageUrl.trim(),
      description: this.description.trim()
    };

    if (this.editingId) {
      const updated = this.productService.updateProduct(productData);

      if (!updated) {
        this.toastr.error('Unable to update this product.');
        return;
      }

      this.toastr.success('Product updated successfully.');
    } else {
      this.productService.addProduct({
        name: productData.name,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
        imageUrl: productData.imageUrl,
        description: productData.description
      });

      this.toastr.success('Product added successfully.');
    }

    this.resetForm();
    this.loadProducts();
  }

  editProduct(product: ProductModel): void {
    this.editingId = product._id;
    this.name = product.name;
    this.category = product.category;
    this.price = product.price;
    this.stock = product.stock;
    this.imageUrl = product.imageUrl ?? '';
    this.description = product.description ?? '';
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
      this.toastr.success('Product deleted successfully.');
      this.loadProducts();
    }
  }

  resetForm(): void {
    this.editingId = null;
    this.name = '';
    this.category = '';
    this.price = null;
    this.stock = null;
    this.imageUrl = '';
    this.description = '';
  }

  searchProducts(): void {
    this.currentPage = 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
