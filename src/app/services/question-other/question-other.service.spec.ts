import { TestBed } from '@angular/core/testing';

import { QuestionOtherService } from './question-other.service';

describe('QuestionOtherService', () => {
  let service: QuestionOtherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionOtherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
