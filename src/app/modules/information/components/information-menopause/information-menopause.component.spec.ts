import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationMenopauseComponent } from './information-menopause.component';

describe('InformationMenopauseComponent', () => {
  let component: InformationMenopauseComponent;
  let fixture: ComponentFixture<InformationMenopauseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationMenopauseComponent]
    });
    fixture = TestBed.createComponent(InformationMenopauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
