import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishCycleComponent } from './finish-cycle.component';

xdescribe('FinishCycleComponent', () => {
  let component: FinishCycleComponent;
  let fixture: ComponentFixture<FinishCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishCycleComponent]
    });
    fixture = TestBed.createComponent(FinishCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
