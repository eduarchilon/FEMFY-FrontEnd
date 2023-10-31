import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { Cycle } from 'src/app/models/cicle.model';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { setDayOfOvulation } from 'src/app/services/redux/actions/calendar.action';

fdescribe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let store: Store<any>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [PieChartComponent],
      imports: [HttpClientModule],
      providers: [{ provide: Store, useValue: storeSpy }],
    });
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPieChartContentData()', () => {
    const mockCycleChart: Cycle = {
      daysOfBleeding: 5,
    };

    const result = component.setPieChartContentData(mockCycleChart);

    expect(result.type).toBe('pie');
  });

  it('setPieContainerData()', () => {
    const mockOptionSeries: any = {
      data: [
        {
          id: 1,
          dayCount: 5,
          label: 'Sangrado',
          color: '#fda4af',
          fase: 'menstrualDay',
        },
      ],
    };

    const mockCycleChart: Cycle = {};

    const result = component.setPieContainerData(
      mockOptionSeries,
      mockCycleChart
    );

    expect(result.type).toBe('pie');
  });

  it('setDaysCycleComplete()', () => {
    const mockQuestionUserMenstruation: QuestionUserMenstruation = {};

    const mockCyclesWithOutEndNull: Cycle[] = [{}];

    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    component['store'] = storeSpy;

    const result = component.setDaysCycleComplete(
      mockQuestionUserMenstruation,
      mockCyclesWithOutEndNull
    );

    expect(mockCyclesWithOutEndNull).not.toBeNull();
  });
});
