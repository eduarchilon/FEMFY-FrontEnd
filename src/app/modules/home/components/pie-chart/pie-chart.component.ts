import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AgPolarChartOptions, AgPolarSeriesOptions } from 'ag-charts-community';
import { Cycle } from 'src/app/models/cicle.model';
import {
  DataPieChart,
  DataPieChartChildren,
} from 'src/app/models/data-pie-chart';
import { setDayOfOvulation } from 'src/app/services/redux/actions/calendar.action';
import { setCycleState } from 'src/app/services/redux/actions/cycle.action';
import { AppState } from 'src/app/services/redux/store/app.store';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { EventDayDrawerComponent } from 'src/app/modules/calendar/components/event-day-drawer/event-day-drawer.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Observable, Subscription } from 'rxjs';
import { cyclesUserSelector } from 'src/app/services/redux/selectors/cycle-user.selector';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { editUserData } from 'src/app/services/redux/actions/user/user-data-page.action';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() averageQuestionCycleContent: number[] = [];

  eventdataChildrenSeries!: DataPieChartChildren[];

  cycles: Cycle[] = [];
  cyclesWithEndNull: Cycle[] = [];
  cyclesWithOutEndNull: Cycle[] = [];

  cyclesUser$: Observable<Cycle> = this.store.select(cyclesUserSelector);
  private cyclesUserSubscription: Subscription | null = null;

  //PIE-CHART
  options!: AgPolarChartOptions;
  sizeChart: number = 0;
  cycleChart!: Cycle;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    if (this.cyclesUserSubscription) {
      this.cyclesUserSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.cyclesUserSubscription = this.cyclesUser$?.subscribe(
      async (dataCycle: any) => {
        if (dataCycle?.length > 0) {
          this.cycles = await dataCycle; //TODO

          this.cyclesWithEndNull = await dataCycle?.filter(
            (item: any) => item?.dateEnd === null
          );

          this.cyclesWithOutEndNull = await dataCycle?.filter(
            (item: any) => item?.dateEnd !== null
          );

          let chat12: AgPolarSeriesOptions = {};
          let chat13: AgPolarSeriesOptions = {};
          this.cycleChart = this.cyclesWithEndNull[0];
          chat12 = this.setPieChartContentData(
            this.averageQuestionCycleContent,
            this.cycleChart
          );
          chat13 = this.setPieContainerData(
            chat12,
            this.cyclesWithEndNull,
            this.averageQuestionCycleContent
          );
          this.options = {
            width: this.getWindowSize(),
            height: this.getWindowSize(),
            autoSize: true,
            padding: {
              top: 5,
              right: 5,
              bottom: 5,
              left: 5,
            },
            series: [chat12, chat13],
            legend: {
              enabled: false,
            },
            background: {
              visible: false,
            },
          };
        }
      }
    );
    this.sizeChart = window.innerWidth;
  }

  setPieChartContentData(
    averageQuestionCycleContent: number[],
    cycleChart: Cycle
  ): AgPolarSeriesOptions {
    //PROMEDIO DE DURACION DE CICLOS
    const daysCycleComplete = this.setAverageCycles(
      averageQuestionCycleContent
    );

    let data: DataPieChart[] = [
      {
        id: 1,
        dayCount: Number(cycleChart?.daysOfBleeding), //duracion de sangrado 6
        label: 'Sangrado',
        color: '#fda4af',
        fase: 'menstrualDay',
      },
      {
        id: 2,
        dayCount: Number(
          Math.round(daysCycleComplete / 2 - 5) - cycleChart?.daysOfBleeding //
        ),
        label: 'Días infértiles',
        color: '#bfdbfe',
        fase: 'folicularDay',
      },
      {
        id: 3,
        dayCount: 5,
        label: 'Días fértiles',
        color: '#d9f99d',
        fase: 'fertileDay',
      },
      {
        id: 4,
        dayCount: 20,
        label: 'Días infértiles',
        color: '#bfdbfe',
        fase: 'luteaDay',
      },
    ];
    return {
      type: 'pie',
      data: data,
      outerRadiusRatio: 0.8,
      showInLegend: false,
      listeners: {
        nodeClick: (event: any) => {
          // this.router.navigate(['calendario']);
        },
      },
      sectorLabelKey: 'label',
      angleKey: 'dayCount',
      sectorLabel: {
        color: 'black',
        fontWeight: '600',
        fontStyle: 'normal',
        fontSize: 12,
        fontFamily: '"Raleway", system-ui, sans-serif',
        positionOffset: 16,
        formatter: ({ sectorLabelValue }: any) => {
          const palabras: any = sectorLabelValue.split(' ');
          return `${
            palabras.length > 1 ? palabras[0] + '\n' + palabras[1] : palabras
          }`;
        },
      },
      fills: data.map((item: any) => item.color),
      strokeWidth: 2,
      strokes: ['purple'],
      tooltip: {
        enabled: false,
      },
      highlightStyle: {
        item: {
          fillOpacity: 0,
          stroke: '#535455',
          strokeWidth: 1,
        },
      },
    };
  }

  setPieContainerData(
    optionSeries: AgPolarSeriesOptions | any,
    cycleChart: any,
    averageQuestionCycleContent?: number[]
  ): AgPolarSeriesOptions {
    // console.log(cycleChart[0]);
    // console.log(moment(cycleChart[0]?.dateBeging));
    const daysAverageCycle = this.setAverageCycles(averageQuestionCycleContent);
    this.setDaysCycleComplete(daysAverageCycle);
    const newDataArray: DataPieChartChildren[] = [];
    // console.log(optionSeries);

    optionSeries?.data?.forEach((item: any) => {
      for (let i = 1; i <= item.dayCount; i++) {
        newDataArray.push({
          id: newDataArray.length + 1,
          dayCount: 1,
          label: item.label,
          color: item.color,
          width: 0,
          fase: item.fase,
        });
      }
    });
    const sumaTotal = newDataArray.reduce((acumulador, elemento) => {
      return acumulador + elemento.dayCount;
    }, 0);

    const diff = moment(new Date())
      .add(1, 'day')
      .diff(this.cycleChart?.dateBeging, 'days');

    const dataChildrenSeries: DataPieChartChildren[] = newDataArray.map(
      (item: any) => {
        item.date = moment(cycleChart[0]?.dateBeging)
          .add(item.id - 1, 'day')
          ?.locale('es')
          .format('L');
        // console.log(item.id);
        // console.log(diff);
        item.hour = this.localStorageService.getUserByLogin().emotion;
        item.width = (newDataArray.length / sumaTotal) * 100;
        item.desc = '';
        if (item.id === diff) {
          item.color = 'red';
          item.desc = 'Hoy';
        } else if (item.id === Math.round(daysAverageCycle)) {
          item.color = 'yellow';
          item.desc = 'Fin del ciclo';
        } else if (item.id === Math.round(daysAverageCycle / 2)) {
          item.color = 'green';
          item.desc = 'Ovulación';
        }
        if (item.id === Math.round(daysAverageCycle / 2) && item.id === diff) {
          item.color = 'red';
          item.desc = 'Hoy / Ovulación';
        } else if (
          item.id === Math.round(daysAverageCycle) &&
          item.id === diff
        ) {
          item.color = 'red';
          item.desc = 'Hoy / Fin del ciclo';
        }
        item.date;

        this.setNotificactionCycle(item);
        return item;
      }
    );

    this.eventdataChildrenSeries = dataChildrenSeries;

    // console.log(dataChildrenSeries);

    if (
      newDataArray[diff - 1]?.fase !==
        this.localStorageService.getUserByLogin()?.state &&
      this.cyclesWithEndNull.length > 0
    ) {
      this.store.dispatch(
        editUserData({
          userData: {
            ...this.localStorageService.getUserByLogin(),
            state: newDataArray[diff - 1]?.fase,
          },
        })
      );
    }

    //BORRAR O ARREGLAR DESPUES
    if (newDataArray) {
      this.store.dispatch(
        setCycleState({
          cycleState: {
            ovulationNumber: Math.round(daysAverageCycle / 2),
            statePhase: newDataArray[diff - 1],
          },
        })
      );
    }

    return {
      type: 'pie',
      data: dataChildrenSeries,
      innerRadiusRatio: 0.8,
      listeners: {
        nodeDoubleClick: (event: any) => {
          this.openDialogCalendarEvent(moment(event?.datum), event?.datum);
        },
      },
      sectorLabelKey: 'id',
      angleKey: 'width',
      sectorLabel: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: 10,
      },
      fills: dataChildrenSeries.map((item: any) => item.color),
      strokeWidth: 2,
      calloutLabelKey: this.defineCalloutLabelKey(dataChildrenSeries),
      calloutLabel: {
        minAngle: 0,
        fontWeight: 'bolder',
      },
      calloutLine: {
        strokeWidth: 2,
      },
      strokes: ['#6a6a6a'],
      tooltip: {
        renderer: ({ datum, color, sectorLabelKey }) => {
          this.information(datum);
          return [
            `<div style="background-color: ${color}; padding: 4px 8px; border-top-left-radius: 5px; border-top-right-radius: 5px; color: white; font-weight: bold;cursor: pointer;">`,
            datum.desc || datum.label,
            `</div>`,
            `<div style="padding: 10px 8px;">`,
            `  <strong class="flex justify-between gap-5"><p>${datum.date}</p><a href="https://femfy-stage.vercel.app/calendario"><i class="fa fa-calendar" style="color: red;" aria-hidden="true"></i></a></strong>`,
            `</div>`,
          ].join('\n');
        },
        interaction: {
          enabled: true,
        },
        showArrow: false,
      },
      highlightStyle: {
        item: {
          fillOpacity: 0,
          stroke: '#535455',
          strokeWidth: 1,
        },
      },
    };
  }

  defineCalloutLabelKey(data: any) {
    return data?.some((item: any) => item?.desc) ? 'desc' : undefined;
  }

  daySelectedDrawer!: any;
  information(datum: any): void {
    this.daySelectedDrawer = datum;
  }

  ngAfterViewInit(): void {}

  dialogIsOpen: boolean = false;
  // @ViewChild('tooltipCalendar') tooltipCalendar!: MatCalendar<Date>;

  openDialogCalendarEvent(daySelected: any, itemChart: any): void {
    const dateArray = itemChart?.date?.split('/');

    const newDate = new Date(
      Number(dateArray[2]),
      Number(dateArray[1]) - 1,
      Number(dateArray[0])
    );

    if (!this.dialogIsOpen) {
      this.dialogIsOpen = true;
      this.dialog
        .open(EventDayDrawerComponent, {
          panelClass: [
            '!max-w-[95vw]',
            'max-lg:!w-[80%]',
            'max-md:!w-[100vw]',
            'max-xl:!w-[50%]',
            '!w-[50%]',
            '!rounded-[20px]',
          ],
          data: {
            daySelected: moment(new Date(newDate)),
            itemChart,
          },
        })
        .afterClosed()
        .subscribe(() => {
          this.dialogIsOpen = false;
        });
    }
  }

  setDaysCycleComplete(daysAverageCycle: number): void {
    if (daysAverageCycle) {
      this.store.dispatch(
        setDayOfOvulation({
          numberOvulation: Math.round(daysAverageCycle / 2),
        })
      );
    }
  }

  setAverageCycles(averageQuestionCycleContent?: number[] | any): number {
    const total: number | any = averageQuestionCycleContent?.reduce(
      (total: any, num: any) => total + num,
      0
    );
    averageQuestionCycleContent?.reduce(
      (total: any, num: any) => total + num,
      0
    );
    const daysCycleComplete = total / averageQuestionCycleContent?.length;
    return daysCycleComplete;
  }

  //STYLE RESPONSE

  getWindowSize(): number {
    let value = 400;
    if (window.innerWidth < 380) {
      value = 320;
    } else if (window.innerWidth < 500) {
      value = 370;
    } else if (window.innerWidth < 1024) {
      value = 390;
    } else if (window.innerWidth < 1100) {
      value = 270;
    } else if (window.innerWidth < 1200) {
      value = 350;
    } else {
      value = 370;
    }
    return value;
  }

  @HostListener('window:resize', ['$event'])
  onResizeWidth(event: any): void {
    if (window.innerWidth < 380) {
      this.sizeChart = 320;
    } else if (window.innerWidth < 500) {
      this.sizeChart = 370;
    } else if (window.innerWidth < 1024) {
      this.sizeChart = 390;
    } else if (window.innerWidth < 1100) {
      this.sizeChart = 270;
    } else if (window.innerWidth < 1200) {
      this.sizeChart = 370;
    } else {
      this.sizeChart = 370;
    }
    this.options = {
      ...this.options,
      width: this.sizeChart,
      height: this.sizeChart,
    };
  }

  setNotificactionCycle(item: any) {
    if (moment(new Date(item.date)).date() === moment(new Date()).date()) {
      console.log(item.label);
      this.notificationService
        .enviarNotificacion(
          'Información de ciclo',
          'Su nueva etapa es: ' + item.label
        )
        .subscribe({
          next: (res: any) => res,
        });
    }
  }
}
