import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginMode = true;
  loading = false;
  error: string = null;

  authObs: Observable<AuthResponse>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  swithcMode() {
    this.loginMode = !this.loginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.loading = true;
    let email = form.value.email;
    let password = form.value.password;
    if (this.loginMode) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signup(email, password);
    }

    this.authObs.subscribe(
      (res) => {
        this.loading = false;
        // console.log('Signed up', res);
        this.router.navigate(['/recipies']);
        this.error = null;
      },
      (err) => {
        this.loading = false;

        console.log(err);
        this.error = err;
      }
    );
  }
}
