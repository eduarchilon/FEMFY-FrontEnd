import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginUsuarioComponent } from './login-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('LoginUsuarioComponent', () => {
  let component: LoginUsuarioComponent;
  let fixture: ComponentFixture<LoginUsuarioComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', [
      'showLoader',
      'hideLoader',
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginUsuarioComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: Store, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(LoginUsuarioComponent);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    loaderService = TestBed.inject(
      LoaderService
    ) as jasmine.SpyObj<LoaderService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginUser should call login service and show loader', () => {
    const authenticatedUser = createAuthenticatedUser('ana', 'ana');
    setupAuthServiceLogin(authService, authenticatedUser);
    setupLoginForm(component.formLogin, authenticatedUser.userName, authenticatedUser.password);

    component.loginUser();

    assertLoaderServiceShowLoader(loaderService);
    assertAuthServiceLoginCalled(authService, authenticatedUser);
  });

  function createAuthenticatedUser(userName: string, password: string) {
    return {
      idUser: 61,
      typeUserID: 1,
      firstName: null,
      lastName: null,
      userName,
      password,
      isSuscriptor: null,
      birthdate: '1992-10-15',
      phone: null,
      email: 'ana@gmail.com',
      emotion: null,
      localidad: null,
      avatar: null,
    };
  }

  function setupAuthServiceLogin(authService: jasmine.SpyObj<AuthService>, user: any) {
    authService.login.and.returnValue(of(user));
  }

  function setupLoginForm(formLogin: any, userName: string, password: string) {
    formLogin.setValue({ userName, password });
  }

  function assertLoaderServiceShowLoader(loaderService: jasmine.SpyObj<LoaderService>) {
    expect(loaderService.showLoader).toHaveBeenCalled();
  }

  function assertAuthServiceLoginCalled(authService: jasmine.SpyObj<AuthService>, user: any) {
    expect(authService.login).toHaveBeenCalledWith(user.userName, user.password);
  }

});