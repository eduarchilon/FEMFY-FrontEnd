import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { emptyUserResponse } from 'src/app/models/user.model';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent {
  formRegister: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  signupUser(): void {
    this.authService
      .register({
        userName: this.formRegister?.value?.userName,
        password: this.formRegister?.value?.password,
        birthdate: this.formRegister?.value?.birthdate,
        email: this.formRegister?.value?.email,
      })
      .subscribe({
        next: (response: any) => {
          return response;
        },
        error: (error) => error,
      });
  }
}
