import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationHistorialComponent } from './information-historial.component';

describe('InformationHistorialComponent', () => {
  let component: InformationHistorialComponent;
  let fixture: ComponentFixture<InformationHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationHistorialComponent]
    });
    fixture = TestBed.createComponent(InformationHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
