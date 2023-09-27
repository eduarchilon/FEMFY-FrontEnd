import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicleHistorialComponent } from './cicle-historial.component';

xdescribe('CicleHistorialComponent', () => {
  let component: CicleHistorialComponent;
  let fixture: ComponentFixture<CicleHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CicleHistorialComponent]
    });
    fixture = TestBed.createComponent(CicleHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
