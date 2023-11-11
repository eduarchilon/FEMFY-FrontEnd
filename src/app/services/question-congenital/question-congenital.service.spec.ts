import { TestBed } from '@angular/core/testing';

import { QuestionCongenitalService } from './question-congenital.service';

describe('QuestionCongenitalService', () => {
  let service: QuestionCongenitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCongenitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
