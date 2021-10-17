import { Component, Input, OnInit } from '@angular/core';
import IProduct from 'src/app/models/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: IProduct[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  updateProduct(product: IProduct) {
    console.log(product);
  }

  removeProduct(product: IProduct) {
    console.log(product);
  }
}
