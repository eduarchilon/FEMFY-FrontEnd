import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHormonalComponent } from './question-hormonal.component';

describe('QuestionHormonalComponent', () => {
  let component: QuestionHormonalComponent;
  let fixture: ComponentFixture<QuestionHormonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionHormonalComponent]
    });
    fixture = TestBed.createComponent(QuestionHormonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
