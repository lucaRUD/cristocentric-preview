import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  rememberMe = false;
  show: boolean = false;
  returnUrl: string | null = null;

  toggleShow() {
    this.show = !this.show;
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('onSubmit called');
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          // handle successful login
          // Set user as logged in and set user data
          this.authService.setLoggedIn(true);
          this.authService.setUser(response);
          this.authService.getUserData();
          location.reload();

          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.log('login failed');
          this.error = 'Invalid username or password';
        }
      );
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
