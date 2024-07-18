import { Component, inject, signal } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { filter } from 'rxjs';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CardComponent, RouterLink, MatButtonModule, NoItemsComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);

  productsService = inject(ProductsService)
  router = inject(Router);
  confirmationDialog = inject(ConfirmationDialogService);
  matSnackBar = inject(MatSnackBar);

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmationDialog
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id)
          .subscribe(() => {
            this.productsService.getAll().subscribe((products) => {
              this.products.set(products);
            });

            this.matSnackBar.open(`Produto ${product.title.toUpperCase()} excluído!`, 'Ok');
          });
      });
  }
}
