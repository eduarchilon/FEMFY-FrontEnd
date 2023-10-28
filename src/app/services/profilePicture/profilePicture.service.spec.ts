import { TestBed } from '@angular/core/testing';
import { SharedProfileService } from './profilePicture.service';

describe('ProfileService', () => {
  let service: SharedProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
