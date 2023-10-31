import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationDialogComponent } from './recomendation-dialog.component';

describe('RecomendationDialogComponent', () => {
  let component: RecomendationDialogComponent;
  let fixture: ComponentFixture<RecomendationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendationDialogComponent]
    });
    fixture = TestBed.createComponent(RecomendationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
