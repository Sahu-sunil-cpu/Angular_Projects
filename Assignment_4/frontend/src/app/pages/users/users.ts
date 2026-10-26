import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: User[] = [];

  isLoading = false;
  isSaving = false;
  showForm = false;
  isEditing = false;

  errorMessage = '';
  successMessage = '';

  formUser: User = this.emptyUser();

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private emptyUser(): User {
    return {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '' }
    };
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cdr.detectChanges();

        console.log('Users loaded:', data.length);
        console.log('Loading state:', this.isLoading);
      },
      error: (error) => {
        console.error('Failed to load users:', error);

        this.errorMessage =
          'Unable to load users. Please check your connection and try again.';

        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.formUser = this.emptyUser();
    this.isEditing = false;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }


  cancelForm(): void {
    this.showForm = false;
    this.formUser = this.emptyUser();
    this.errorMessage = '';
  }


  editUser(user: User): void {
    if (!user._id) {
      this.errorMessage = 'Cannot edit this user: MongoDB ID is missing.';
      return;
    }

    this.isEditing = true;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.formUser = {
      name: user.name,
      username: user.username || '',
      email: user.email,
      phone: user.phone || '',
      website: user.website || '',
      company: {
        name: user.company?.name || '',
      },
      _id: user._id,
    };
  }

  saveUser(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.formUser.name.trim() || !this.formUser.email.trim()) {
      this.errorMessage = 'Name and email are required.';
      return;
    }

    this.isSaving = true;

    const payload: User = {
      name: this.formUser.name.trim(),
      username: this.formUser.username?.trim() || '',
      email: this.formUser.email.trim(),
      phone: this.formUser.phone?.trim() || '',
      website: this.formUser.website?.trim() || '',
      company: {
        name: this.formUser.company?.name?.trim() || '',
      },
    };

    const request$ =
      this.isEditing && this.formUser._id
        ? this.userService.updateUser(this.formUser._id, payload)
        : this.userService.addUser(payload);

    request$.subscribe({
      next: (savedUser) => {
        if (this.isEditing) {
          this.users = this.users.map((user) =>
            user._id === savedUser._id ? savedUser : user
          );
          this.successMessage = 'User updated successfully.';
        } else {
          this.users = [savedUser, ...this.users];
          this.successMessage = 'User created successfully.';
        }

        this.showForm = false;
        this.isEditing = false;
        this.formUser = this.emptyUser();
        this.isSaving = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Unable to save user. Please try again.';
        this.isSaving = false;
      },
    });
  }

  deleteUser(user: User): void {
    if (!user._id) {
      this.errorMessage = 'Cannot delete this user: MongoDB ID is missing.';
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users = this.users.filter(
          (existingUser) => existingUser._id !== user._id
        );

        this.successMessage = 'User deleted successfully.';
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Unable to delete user. Please try again.';
      },
    });
  }
}
