import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationOtherComponent } from './information-other.component';

describe('InformationOtherComponent', () => {
  let component: InformationOtherComponent;
  let fixture: ComponentFixture<InformationOtherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationOtherComponent]
    });
    fixture = TestBed.createComponent(InformationOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
