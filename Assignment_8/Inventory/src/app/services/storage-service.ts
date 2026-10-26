
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    getData<T>(key: string, defaultValue: T): T {
        try {
            const data = localStorage.getItem(key);

            if (data === null) {
                return defaultValue;
            }

            return JSON.parse(data) as T;
        } catch (error) {
            console.error(`Error reading ${key} from LocalStorage:`, error);
            return defaultValue;
        }
    }

    saveData<T>(key: string, data: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving ${key} to LocalStorage:`, error);
        }
    }

    removeData(key: string): void {
        localStorage.removeItem(key);
    }

    clearAll(): void {
        localStorage.clear();
    }
}
