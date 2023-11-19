import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationComponent } from './conversation.component';

xdescribe('ConversationComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationComponent]
    });
    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
