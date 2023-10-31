import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationUserComponent } from './information-user.component';

describe('InformationUserComponent', () => {
  let component: InformationUserComponent;
  let fixture: ComponentFixture<InformationUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationUserComponent]
    });
    fixture = TestBed.createComponent(InformationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
