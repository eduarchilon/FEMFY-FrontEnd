import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCycleComponent } from './delete-cycle.component';

xdescribe('DeleteCycleComponent', () => {
  let component: DeleteCycleComponent;
  let fixture: ComponentFixture<DeleteCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCycleComponent]
    });
    fixture = TestBed.createComponent(DeleteCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
