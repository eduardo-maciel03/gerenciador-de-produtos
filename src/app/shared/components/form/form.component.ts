import { Component, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  product = input<Product | null>(null);

  form!: FormGroup;
  matSnackBar = inject(MatSnackBar);

  @Output() save = new EventEmitter<Product>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', {
        validators: Validators.required
      }),
      price: new FormControl<string>(this.product()?.price ?? '', {
        validators: Validators.required
      }),
      stock: new FormControl<string>(this.product()?.stock ?? '')
    });
  }

  onSubmit() {
    const product = this.form.value as Product;

    if(this.form.get('title')?.hasError('required') &&
       this.form.get('price')?.hasError('required')) {
      this.matSnackBar.open('Informe todos os campos obrigatórios *', 'Ok');
      return;
    }

    if(this.form.get('stock')?.value === null) {
      product.stock = "1";
    }
    debugger
    this.save.emit(product);
  }
}
