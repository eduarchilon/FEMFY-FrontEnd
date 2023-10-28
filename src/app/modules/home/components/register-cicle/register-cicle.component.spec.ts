import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCicleComponent } from './register-cicle.component';

xdescribe('RegisterCicleComponent', () => {
  let component: RegisterCicleComponent;
  let fixture: ComponentFixture<RegisterCicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCicleComponent]
    });
    fixture = TestBed.createComponent(RegisterCicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
