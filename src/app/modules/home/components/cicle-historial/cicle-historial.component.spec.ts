import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicleHistorialComponent } from './cicle-historial.component';
import { Store } from '@ngrx/store';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { calculateCycleDurantionWithDates } from 'src/app/utils/average-period.utils';

fdescribe('CicleHistorialComponent', () => {
  let component: CicleHistorialComponent;
  let fixture: ComponentFixture<CicleHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CicleHistorialComponent],

      providers: [
        { provide: Store, useValue: {} },
        { provide: CicleService, },
      ],
      imports: [HttpClientModule, MatDividerModule]
    });
    fixture = TestBed.createComponent(CicleHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculateCycleDurantion should return the correct duration', () => {

    const dateBeging = new Date('2023-01-01');
    const dateEnd = new Date('2023-01-10');

    const result = component.calculateCycleDurantion(dateBeging, dateEnd);

    const expectedDuration = calculateCycleDurantionWithDates(dateBeging, dateEnd);
    expect(result).toBe(expectedDuration);
  });

  it('should return -9 for incorrect dates', () => {
    const dateBeging = new Date('2023-01-10');
    const dateEnd = new Date('2023-01-01');
    
    const result = component.calculateCycleDurantion(dateBeging, dateEnd);

    expect(result).toBe(-9);
  });
});
