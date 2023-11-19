import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCongenitalComponent } from './question-congenital.component';

describe('QuestionCongenitalComponent', () => {
  let component: QuestionCongenitalComponent;
  let fixture: ComponentFixture<QuestionCongenitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionCongenitalComponent]
    });
    fixture = TestBed.createComponent(QuestionCongenitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
