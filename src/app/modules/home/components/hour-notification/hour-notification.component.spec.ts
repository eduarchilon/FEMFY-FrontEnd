import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourNotificationComponent } from './hour-notification.component';

describe('HourNotificationComponent', () => {
  let component: HourNotificationComponent;
  let fixture: ComponentFixture<HourNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourNotificationComponent]
    });
    fixture = TestBed.createComponent(HourNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
