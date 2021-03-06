import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, take, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';

export interface User {
  id: number;
  username: string;
}

export interface UserResponse {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject$ = new BehaviorSubject<User | null>(null);

  private getToken(): string | null{
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.userSubject$.next(null);
  }

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getUser(): Observable<any>{
    const token = this.getToken();
    if(!token) return of(null);
    return this.http.get<UserResponse>(environment.api + 'users', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).pipe(
      tap((res) => {
        console.log(res, "res")
      if(res.user)
        this.userSubject$.next(res.user);
      },
      catchError((error) => {
        return of(null);
      })
    ))
  }


  loginUser(username: string, password: string): Observable<any>{
    const url = environment.api + 'users/login';
    return this.http.post<{ token: string }>(url, {
      username,
      password
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap((res) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          this.getUser().pipe(take(1)).subscribe();
        }
      }),
      catchError((error) => {
        console.log(error, "error")
        this.toastService.addToast({
          message: error.error.error,
          type: 'error',
          duration: 3000
        })
        return of(null);
      })
    )
  }

  registerUser(username: string, password: string): Observable<any>{
    return this.http.post(environment.api + 'users/signup', {
      username,
      password
    }).pipe(
      catchError((error) => {
        console.log(error, "error")
        this.toastService.addToast({
          message: error.error.error.message,
          type: 'error',
          duration: 3000
        })
        return of(null);
      })
    )
  }
}
