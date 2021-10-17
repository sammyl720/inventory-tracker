import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import IProduct from 'src/app/models/products';
import { IResponse, ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { User, UserService } from '../../services/user.service'
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Input() user: User | null = null;
  shouldShowAddProductModal = false;
  products: IProduct[] = [];
  addProductForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0)]],
    quantity: ['', [Validators.required, Validators.min(0)]],
    details: this.fb.group({
      description: ['', [Validators.required]]
    })
  });

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productService.productSubject$.subscribe(products => {
      this.products = products;
    })
  }

  logout(){
    this.userService.logoutUser();
    this.user = null;
  }

  showAddProductModal(){
    this.shouldShowAddProductModal = true;
  }

  hideAddProductModal(){
    this.shouldShowAddProductModal = false;
  }

  addProduct(){
    this.productService.addProduct(this.addProductForm.value).subscribe(
      (response: IResponse) => {
      this.hideAddProductModal();
      this.toastService.addToast({
        type: 'success',
        message: 'Product added successfully',
        duration: 3000
      })
    })
  }}
