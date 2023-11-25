import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieNotificationComponent } from './pie-notification.component';

describe('PieNotificationComponent', () => {
  let component: PieNotificationComponent;
  let fixture: ComponentFixture<PieNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieNotificationComponent]
    });
    fixture = TestBed.createComponent(PieNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
