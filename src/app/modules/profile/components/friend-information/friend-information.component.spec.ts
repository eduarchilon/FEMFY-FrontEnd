import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInformationComponent } from './friend-information.component';

describe('FriendInformationComponent', () => {
  let component: FriendInformationComponent;
  let fixture: ComponentFixture<FriendInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendInformationComponent]
    });
    fixture = TestBed.createComponent(FriendInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
