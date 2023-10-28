import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOtroComponent } from './question-otro.component';

describe('QuestionOtroComponent', () => {
  let component: QuestionOtroComponent;
  let fixture: ComponentFixture<QuestionOtroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionOtroComponent]
    });
    fixture = TestBed.createComponent(QuestionOtroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
