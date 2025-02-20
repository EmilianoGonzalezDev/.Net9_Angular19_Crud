import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

// Router
import { Router } from '@angular/router';
// Interface
import { Product } from '../../interfaces/product';
// Service
import { ProductService } from '../../../services/product.service';
// Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private productService = inject(ProductService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: WritableSignal<Product[]> = signal<Product[]>([]);

  displayedColumns = ['id', 'description', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);


  ngOnInit(): void {
    this.loadProducts();
    /* this.productService.getProducts().subscribe({
    //   next: (resp) => {
    //     console.log('API response', resp);
    //   },
    //   error: (err) => {
    //     console.log('Error getting products: ', err);
    //   },
    //   complete: () => {

    //   }
    // });
    */
  }

  loadProducts(){
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products.set(resp);
        this.updateTableData();
      }
    });
  }

  updateTableData() {
    this.dataSource.data = this.products();
    this.dataSource.paginator = this.paginator;
    }

  navigateToForm(id?:number) {
    const path = id ? `/products/edit/${id}` : '/products/new';
    this.router.navigate([path]);
  }

  deleteProduct(id:number) {
    console.log(id);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.productService.deleteProduct(id).subscribe(() => {
          const updatedProducts = this.products().filter((product) => product.id !== id);
          this.products.set(updatedProducts);
          this.updateTableData();
        });
      }
    })
  }
}
