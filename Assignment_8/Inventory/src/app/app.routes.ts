
import { Routes, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

import { Login } from './login/login';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Product } from './product/product';
import { Categories } from './categories/categories';
import { Orders } from './orders/orders';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLoggedIn()
        ? true
        : router.createUrlTree(['/login']);
};

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'products',
                component: Product
            },
            {
                path: 'categories',
                component: Categories
            },
            {
                path: 'orders',
                component: Orders
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
