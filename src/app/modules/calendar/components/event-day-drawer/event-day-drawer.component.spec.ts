import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDayDrawerComponent } from './event-day-drawer.component';

xdescribe('EventDayDrawerComponent', () => {
  let component: EventDayDrawerComponent;
  let fixture: ComponentFixture<EventDayDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDayDrawerComponent]
    });
    fixture = TestBed.createComponent(EventDayDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
