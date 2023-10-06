import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  spinnerConsumer: string = 'LoginUsuarioComponent';

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.authService
      .login(this.formLogin?.value?.userName, this.formLogin?.value?.password)
      .subscribe({
        next: (authenticatedUser: any) => {
          this.spinnerService.showProgressSpinner(this.spinnerConsumer);
          if (authenticatedUser) {
            this.spinnerService.hideProgressSpinner(this.spinnerConsumer);
            this.router.navigate(['/']);
          } else {
            this.spinnerService.hideProgressSpinner(this.spinnerConsumer);
          }
        },
        error: (error) => error,
      });
  }
}
