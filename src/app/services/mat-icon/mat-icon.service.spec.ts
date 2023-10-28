import { TestBed } from '@angular/core/testing';

import { MatIconService } from './mat-icon.service';

xdescribe('MatIconService', () => {
  let service: MatIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
