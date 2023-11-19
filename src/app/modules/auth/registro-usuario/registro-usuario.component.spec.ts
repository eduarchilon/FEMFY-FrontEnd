import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioComponent } from './registro-usuario.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { QuestionService } from 'src/app/services/question/question.service';
import { Store } from '@ngrx/store';
import { CicleService } from 'src/app/services/cicle/cicle.service';

fdescribe('RegistroUsuarioComponent', () => {
  let component: RegistroUsuarioComponent;
  let fixture: ComponentFixture<RegistroUsuarioComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let questionsService: jasmine.SpyObj<QuestionService>;
  let circleService: jasmine.SpyObj<CicleService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['register']);
    loaderService = jasmine.createSpyObj('LoaderService', [
      'showLoader',
      'hideLoader',
    ]);
    questionsService = jasmine.createSpyObj('QuestionService', [
      'createUserMenstruationQuestion',
    ]);

    circleService = jasmine.createSpyObj('CicleService', ['registerCycle']);

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
        { provide: QuestionService, useValue: loaderService },
        { provide: CicleService, useValue: loaderService },
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
    // const authenticatedUser = {
    //   idUser: 61,
    //   typeUserID: 1,
    //   firstName: null,
    //   lastName: null,
    //   userName: 'ana',
    //   password: 'ana',
    //   isSuscriptor: null,
    //   birthdate: '1992-10-15',
    //   phone: null,
    //   email: 'ana@gmail.com',
    //   emotion: null,
    //   localidad: null,
    //   avatar: null,
    // };

    // authService.register.and.returnValue(of(authenticatedUser)).and.stub();
    // component.formRegister.setValue({
    //   userName: authenticatedUser.userName,
    //   password: authenticatedUser.password,
    //   birthdate: authenticatedUser.birthdate,
    //   email: authenticatedUser.email,
    //   passwordRepeat: authenticatedUser.password,
    // });

    // component.signupUser();

    // expect(loaderService.showLoader).toHaveBeenCalled();
    // expect(authService.register).toHaveBeenCalled();
  });
});
