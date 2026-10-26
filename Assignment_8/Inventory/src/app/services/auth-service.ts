
import { Injectable, inject, signal } from '@angular/core';
import { StorageService } from './storage-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storageService = inject(StorageService);

    private storageKey = 'inventory_logged_in';

    isLoggedIn = signal<boolean>(
        this.storageService.getData<boolean>(this.storageKey, false)
    );

    login(username: string, password: string): boolean {
        if (username === 'admin' && password === 'admin123') {
            this.isLoggedIn.set(true);
            this.storageService.saveData(this.storageKey, true);
            return true;
        }

        return false;
    }

    logout(): void {
        this.isLoggedIn.set(false);
        this.storageService.removeData(this.storageKey);
    }
}
