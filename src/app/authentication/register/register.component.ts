import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  check_url = 'http://localhost:8000/accounts/check-fields/';
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  confirm_password: string = '';
  email: string = '';
  phone_number: string = '';
  bio: string = 'Insert bio here...';
  birth_date!: Date;
  maxDate!: string;
  emailExists = false;
  usernameExists = false;
  phoneNumberExists = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    const today = new Date();
    const minAge = 10;
    const maxBirthDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    this.maxDate = maxBirthDate.toISOString().split('T')[0];
  }

  onSubmit(registerForm: NgForm) {
    // Check if email, username, and phone number already exist
    if (this.password !== this.confirm_password) {
      return;
    }
    this.http
      .get(
        this.check_url +
          this.email +
          '/' +
          this.username +
          '/' +
          this.phone_number +
          '/'
      )
      .subscribe(
        (res: any) => {
          this.emailExists = res.email_exists;
          this.usernameExists = res.username_exists;
          this.phoneNumberExists = res.phone_number_exists;
          if (
            !this.emailExists &&
            !this.usernameExists &&
            !this.phoneNumberExists
          ) {
            this.authService
              .register(
                this.username,
                this.password,
                this.confirm_password,
                this.first_name,
                this.last_name,
                this.email,
                this.phone_number,
                this.bio,
                this.birth_date
              )
              .subscribe(
                (response) => {
                  console.log(response);
                  // Handle success response
                  // Set user as logged in and set user data
                  // this.authService.setLoggedIn(true);
                  this.authService.setUser(response);
                  // Redirect to activation instructions page
                  const navigationExtras = {
                    state: {
                      name: `${this.first_name}`,
                      email: this.email,
                      redirected: true,
                    },
                  };
                  this.router.navigate(
                    ['/activation-instructions'],
                    navigationExtras
                  );
                },
                (error) => {
                  console.log(error);
                  // Handle error response
                }
              );
          }
        },
        (error) => {}
      );
  }
}
