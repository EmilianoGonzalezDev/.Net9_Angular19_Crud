import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

// Forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  productForm:FormGroup;
  isEditMode:boolean = false;

  constructor() {
    this.productForm = this.fb.group({
      id: [null],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.params.subscribe((params) => {
      if (params['id']){
        this.isEditMode = true;
        this.loadProduct(params['id']);
      }
    });
  }
    
  private loadProduct(id:number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => this.productForm.patchValue(product),
      error: (err) => console.error(err)
    })
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const productData = {...this.productForm.value};

    if (this.isEditMode) {
      this.productService.updateProduct(productData.id, productData).subscribe({
        next: () => {
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
    } else {
      delete productData.id;
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.snackBar.open('Product created successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
    }
  }
}