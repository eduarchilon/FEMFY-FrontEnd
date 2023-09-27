import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUsuarioComponent } from './header-usuario.component';

xdescribe('HeaderUsuarioComponent', () => {
  let component: HeaderUsuarioComponent;
  let fixture: ComponentFixture<HeaderUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUsuarioComponent]
    });
    fixture = TestBed.createComponent(HeaderUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
