import { TestBed } from '@angular/core/testing';

import { DocumentationService } from './documentation.service';

xdescribe('DocumentationService', () => {
  let service: DocumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
