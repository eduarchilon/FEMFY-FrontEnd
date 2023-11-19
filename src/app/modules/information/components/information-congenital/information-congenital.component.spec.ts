import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCongenitalComponent } from './information-congenital.component';

describe('InformationCongenitalComponent', () => {
  let component: InformationCongenitalComponent;
  let fixture: ComponentFixture<InformationCongenitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCongenitalComponent]
    });
    fixture = TestBed.createComponent(InformationCongenitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
