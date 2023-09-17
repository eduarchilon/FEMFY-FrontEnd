import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUsuarioComponent } from './footer-usuario.component';

xdescribe('FooterUsuarioComponent', () => {
  let component: FooterUsuarioComponent;
  let fixture: ComponentFixture<FooterUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterUsuarioComponent]
    });
    fixture = TestBed.createComponent(FooterUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
