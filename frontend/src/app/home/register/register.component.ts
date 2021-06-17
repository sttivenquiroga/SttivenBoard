import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }
  ngOnInit(): void {}

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.errorMessage = 'Process failed: Incomplete data';
      this.registerData = {};
      this.closeAlert();
    } else {
      this.auth.registerUser(this.registerData).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this.router.navigate(['/listTask']);
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
          this.registerData = {};
        }
      );
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }
  closeX() {
    this.errorMessage = '';
  }
}
