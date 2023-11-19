import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAppDrawerComponent } from './whats-app-drawer.component';

describe('WhatsAppDrawerComponent', () => {
  let component: WhatsAppDrawerComponent;
  let fixture: ComponentFixture<WhatsAppDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsAppDrawerComponent]
    });
    fixture = TestBed.createComponent(WhatsAppDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
