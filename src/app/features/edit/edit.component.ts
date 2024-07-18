import { Component, inject } from '@angular/core';
import { FormComponent } from "../../shared/components/form/form.component";
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { BackToListComponent } from "../../shared/components/back-to-list/back-to-list.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ FormComponent, BackToListComponent ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  productsService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: Product) {
    this.productsService
      .put(this.product.id, product)
      .subscribe(() => {
        this.matSnackBar.open('Produto editado com sucesso!', 'Ok');

        this.router.navigateByUrl('/');
      });
  }
}
