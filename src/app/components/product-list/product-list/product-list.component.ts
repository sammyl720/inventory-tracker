import { Component, Input, OnInit } from '@angular/core';
import IProduct from 'src/app/models/products';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: IProduct[] = [];
  shouldShowRemoveModal = false;
  productToRemove: IProduct | null = null;

  shouldShowEditModal = false;
  productToEdit: IProduct | null = null;

  constructor(private productService: ProductService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  updateProduct(product: IProduct) {
    this.showEditModal(product);
  }

  removeProduct() {
    console.log(this.productToRemove);
    if(this.productToRemove) {
      this.productService.deleteProduct(this.productToRemove.id).subscribe(() => {
        this.toastService.addToast({
          message: 'Product removed successfully',
          type: 'success',
          duration: 3000
        })
        this.productToRemove = null;
        this.shouldShowRemoveModal = false;
      })
    }
  }

  showRemoveModal(product: IProduct) {
    this.shouldShowRemoveModal = true;
    this.productToRemove = product;
  }

  hideRemoveModal() {
    this.shouldShowRemoveModal = false;
    this.productToRemove = null;
  }

  showEditModal(product: IProduct) {
    this.shouldShowEditModal = true;
    this.productToEdit = product;
  }

  hideEditModal() {
    this.shouldShowEditModal = false;
    this.productToEdit = null;
  }
}
