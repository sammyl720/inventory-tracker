import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IProduct from 'src/app/models/products';
import { IResponse, ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct | null = null;
  @Output() onDone = new EventEmitter();
  form!: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService, private toastService: ToastService) { }

  ngOnInit(): void {
    if(this.product) {
      this.form = this.fb.group({
        name: [this.product.name, [Validators.required, Validators.minLength(3)]],
        price: [this.product.price, [Validators.required, Validators.min(0)]],
        quantity: [this.product.quantity,[Validators.required, Validators.min(0)]],
        details: this.fb.group({
          description: [this.product.details.description, [Validators.required, Validators.minLength(3)]],
        })
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(0)]],
        quantity: [0, [Validators.required, Validators.min(0)]],
        details: this.fb.group({
          description: ['', [Validators.required, Validators.minLength(3)]],
        })
      });
    }
  }

  onSubmit() {
    if(this.product) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct(){
    this.productService.addProduct(this.form.value).subscribe(
      (response: IResponse) => {
      this.toastService.addToast({
        type: 'success',
        message: 'Product added successfully',
        duration: 3000
      })

      this.onDone.emit();
    })
  }

  updateProduct(){
    if(!this.product) return;
    this.productService.updateProduct(this.product.id, this.form.value).subscribe(
      (response: IResponse) => {
      this.toastService.addToast({
        type: 'success',
        message: 'Product updated successfully',
        duration: 3000
      })

      this.onDone.emit();
    })
  }
}
