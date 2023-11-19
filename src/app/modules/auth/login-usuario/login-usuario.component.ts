import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AppState } from 'src/app/services/redux/store/app.store';

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

  isUserNotFinded: boolean = false;

  spinnerConsumer: string = 'LoginUsuarioComponent';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.authService
      .login(this.formLogin?.value?.userName, this.formLogin?.value?.password)
      .subscribe({
        next: (authenticatedUser: any) => {
          this.loaderService.showLoader();
          if (authenticatedUser) {
            this.loaderService.hideLoader();
            this.router.navigate(['/']).then(() => {
              location.reload();
            });
          } else {
            this.loaderService.hideLoader();
            this.isUserNotFinded = true;
          }
        },
        error: (error) => error,
      });
  }

}
