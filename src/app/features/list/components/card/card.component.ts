import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, MatLabel ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>();

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  productId = computed(() => this.product().id);
  productTitle = computed(() => this.product().title);
  productPrice = computed(() => this.product().price);
  productStock = computed(() => this.product().stock);

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
