import { Component, inject } from '@angular/core';
import { FormComponent } from "../../shared/components/form/form.component";
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ FormComponent ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  productsService = inject(ProductsService);
  router = inject(Router);

  onSubmit() {
    this.productsService
  }
}
