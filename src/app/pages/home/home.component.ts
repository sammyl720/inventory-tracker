import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  formType: 'login' | 'signup' = 'login';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      if(data?.user){
        this.user = data.user;
      }
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      },
    () => {
      this.isLoading = false;
    }
    );

    this.userService.userSubject$.subscribe(user => {
      this.user = user;

      this.isLoading = false;
    })
  }

  logout(){
    this.userService.logoutUser();
    this.user = null;
  }

  changeFormType(formType: 'login' | 'signup'){
    this.formType = formType;
  }

}
