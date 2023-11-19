import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsNotificationComponent } from './events-notification.component';

xdescribe('EventsNotificationComponent', () => {
  let component: EventsNotificationComponent;
  let fixture: ComponentFixture<EventsNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsNotificationComponent]
    });
    fixture = TestBed.createComponent(EventsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
