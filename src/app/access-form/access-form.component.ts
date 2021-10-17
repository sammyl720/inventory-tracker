import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-access-form',
  templateUrl: './access-form.component.html',
  styleUrls: ['./access-form.component.scss']
})
export class AccessFormComponent implements OnInit {
  @Input() formType: "login" | "signup" = "login";
  form!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.formType === "login") {
      this.userService.loginUser(this.form.value.username, this.form.value.password).subscribe(
        (res) => {
          console.log(res);
        }
      )
    } else {
      this.userService.registerUser(this.form.value.username, this.form.value.password).subscribe(
        (res) => {
          console.log(res);
        }
      )
    }
  }

}
