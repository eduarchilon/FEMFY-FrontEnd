import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';

fdescribe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    authService = {
      login: jasmine.createSpy('login').and.returnValue(of({})),
    } as unknown as AuthService; 
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [HttpClientModule],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
