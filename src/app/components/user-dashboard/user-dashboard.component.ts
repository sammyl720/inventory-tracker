import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import IProduct from 'src/app/models/products';
import { ProductService } from 'src/app/services/product/product.service';
import { User, UserService } from '../../services/user.service'
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  @Input() user: User | null = null;
  products: IProduct[] = [];
  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.userSubject$.pipe(
      switchMap(user => {
        if(user){
          return this.productService.getUserProducts() as Observable<IProduct[]>;
        }
        return of([]);
      })
    ).subscribe(products => {
      this.products = products;
    })
    this.productService.getUserProducts().subscribe(products => {
      this.products = products;
    })
  }

  logout(){
    this.userService.logoutUser();
    this.user = null;
  }

}
