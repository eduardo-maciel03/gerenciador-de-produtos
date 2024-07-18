import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ FormComponent, BackToListComponent ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  productsService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);

  onSubmit(product: Product) {
    this.productsService.post(product)
      .subscribe(() => {
        this.matSnackBar.open('Produto criado com sucesso!', 'Ok');

        this.router.navigateByUrl('/');
      });
  }
}
