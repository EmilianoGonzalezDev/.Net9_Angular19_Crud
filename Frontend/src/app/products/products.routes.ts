import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

export const PRODUCT_ROUTES = [
    { path: '', component: ProductListComponent },
    { path: 'new', component: ProductFormComponent },
    { path: 'edit/:id', component: ProductFormComponent }
];