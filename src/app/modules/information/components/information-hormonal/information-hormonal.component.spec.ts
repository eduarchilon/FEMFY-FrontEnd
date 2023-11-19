import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationHormonalComponent } from './information-hormonal.component';

describe('InformationHormonalComponent', () => {
  let component: InformationHormonalComponent;
  let fixture: ComponentFixture<InformationHormonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationHormonalComponent]
    });
    fixture = TestBed.createComponent(InformationHormonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
