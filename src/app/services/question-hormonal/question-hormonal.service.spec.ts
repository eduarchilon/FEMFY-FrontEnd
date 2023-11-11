import { TestBed } from '@angular/core/testing';

import { QuestionHormonalService } from './question-hormonal.service';

describe('QuestionHormonalService', () => {
  let service: QuestionHormonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionHormonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
