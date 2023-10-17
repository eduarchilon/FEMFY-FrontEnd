import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCycleComponent } from './edit-cycle.component';

describe('EditCycleComponent', () => {
  let component: EditCycleComponent;
  let fixture: ComponentFixture<EditCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCycleComponent]
    });
    fixture = TestBed.createComponent(EditCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
