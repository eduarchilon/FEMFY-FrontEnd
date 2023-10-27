import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioComponent } from './registro-usuario.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RegistroUsuarioComponent', () => {
  let component: RegistroUsuarioComponent;
  let fixture: ComponentFixture<RegistroUsuarioComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    loaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);

    TestBed.configureTestingModule({
      declarations: [RegistroUsuarioComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: LoaderService, useValue: loaderService },
      ],
    });

    fixture = TestBed.createComponent(RegistroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signupUser()', () => {
    const authenticatedUser = {
      idUser: 61,
      typeUserID: 1,
      firstName: null,
      lastName: null,
      userName: 'ana',
      password: 'ana',
      isSuscriptor: null,
      birthdate: '1992-10-15',
      phone: null,
      email: 'ana@gmail.com',
      emotion: null,
      localidad: null,
      avatar: null,
    };

    authService.register.and.returnValue(of(authenticatedUser));
    component.formRegister.setValue({
      userName: authenticatedUser.userName,
      password: authenticatedUser.password,
      birthdate: authenticatedUser.birthdate,
      email: authenticatedUser.email,
    });

    component.signupUser();

    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(authService.register).toHaveBeenCalledWith({
      userName: authenticatedUser.userName,
      password: authenticatedUser.password,
      birthdate: authenticatedUser.birthdate,
      email: authenticatedUser.email,
    });
  });
});
