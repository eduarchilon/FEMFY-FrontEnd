import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoDiarioComponent } from './consejo-diario.component';

xdescribe('ConsejoDiarioComponent', () => {
  let component: ConsejoDiarioComponent;
  let fixture: ComponentFixture<ConsejoDiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsejoDiarioComponent]
    });
    fixture = TestBed.createComponent(ConsejoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
