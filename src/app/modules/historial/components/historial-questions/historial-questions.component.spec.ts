import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialQuestionsComponent } from './historial-questions.component';

describe('HistorialQuestionsComponent', () => {
  let component: HistorialQuestionsComponent;
  let fixture: ComponentFixture<HistorialQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialQuestionsComponent]
    });
    fixture = TestBed.createComponent(HistorialQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
