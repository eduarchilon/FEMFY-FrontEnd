import { TestBed } from '@angular/core/testing';

import { QuestionMenopausicaService } from './question-menopausica.service';

describe('QuestionMenopausicaService', () => {
  let service: QuestionMenopausicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionMenopausicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
