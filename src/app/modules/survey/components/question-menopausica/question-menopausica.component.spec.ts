import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMenopausicaComponent } from './question-menopausica.component';

describe('QuestionMenopausicaComponent', () => {
  let component: QuestionMenopausicaComponent;
  let fixture: ComponentFixture<QuestionMenopausicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionMenopausicaComponent]
    });
    fixture = TestBed.createComponent(QuestionMenopausicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
