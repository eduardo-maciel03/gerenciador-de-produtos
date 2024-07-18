import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';

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

  onSubmit(product: Product) {
    this.productsService.post(product)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
