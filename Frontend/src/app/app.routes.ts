import { Routes } from '@angular/router';
import { PRODUCT_ROUTES } from './products/products.routes';

export const APP_ROUTES: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full', },
    {path: 'products', children: PRODUCT_ROUTES },
];
