import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import IProduct from 'src/app/models/products';
import { environment } from 'src/environments/environment';
import { User, UserService } from '../user.service';

export interface IResponse {
  message: string;
  resourceUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.api + 'products';
  user: null | User = null;
  productSubject$ = new BehaviorSubject<IProduct[]>([]);
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.userSubject$.subscribe(user => this.user = user);
    this.getUserProducts()
  }

  getUserProducts() {
    const apiUrl = environment.api + 'users/products'
    this.http.get<IProduct[]>(apiUrl).pipe(take(1)).subscribe((products: IProduct[]) => this.productSubject$.next(products));
  }

  addProduct(product: Partial<IProduct>) {
    return this.http.post<IResponse>(this.url, product).pipe(
      tap(res => {
        console.log(res);
        this.getUserProducts();
      })
    );
  }
}
