import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CardComponent, RouterLink, MatButtonModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  products: Product[] = [];

  productsService = inject(ProductsService)
  router = inject(Router);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((response) => {
      this.products = response;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }
}
