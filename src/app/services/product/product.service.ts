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
    const options: { [ key: string]: any} = {
      params: {
        limit: 4
      }
    }
    if(this.user?.id)
      options.params['userId'] = this.user.id;
    return this.http.get<IProduct[]>(this.url, options);
  }
}
