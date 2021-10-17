import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProduct from 'src/app/models/products';
import { environment } from 'src/environments/environment';
import { User, UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.api + 'products';
  user: null | User = null;
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.userSubject$.subscribe(user => this.user = user);
  }

  getUserProducts() {
    const apiUrl = environment.api + 'users/products'
    return this.http.get<IProduct[]>(apiUrl);
  }
}
