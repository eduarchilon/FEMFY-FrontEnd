import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AgPolarChartOptions, AgPolarSeriesOptions } from 'ag-charts-community';
import { Cycle } from 'src/app/models/cicle.model';
import {
  DataPieChart,
  DataPieChartChildren,
} from 'src/app/models/data-pie-chart';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { setDayOfOvulation } from 'src/app/redux/actions/calendar.action';
import { setCycleState } from 'src/app/redux/actions/cycle.action';
import { AppState } from 'src/app/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() cycles: Cycle[] = [];
  @Input() cyclesWithEndNull: Cycle[] = [];
  @Input() cyclesWithOutEndNull: Cycle[] = [];
  @Input() myRegisterQuestion!: QuestionUserMenstruation;

  //Data
  averageCycle!: number;

  //PIE-CHART
  options!: AgPolarChartOptions;
  sizeChart: number = 0;
  cycleChart!: Cycle;

  constructor(
    private store: Store<AppState>,
    private cicleService: CicleService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let chat12: AgPolarSeriesOptions = {};
    let chat13: AgPolarSeriesOptions = {};
    if (this.cycles) {
      this.cycleChart = this.cyclesWithEndNull[0];
      chat12 = this.setPieChartContentData(this.cycleChart);
      chat13 = this.setPieContainerData(chat12, this.cycleChart);
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
    this.sizeChart = window.innerWidth;
  }

  setPieChartContentData(cycleChart: Cycle): AgPolarSeriesOptions {
    const daysCycleComplete = this.setDaysCycleComplete(
      this.myRegisterQuestion,
      this.cyclesWithOutEndNull
    );

    let data: DataPieChart[] = [
      {
        id: 1,
        dayCount: Number(cycleChart?.daysOfBleeding), //duracion de sangrado
        label: 'Sangrado',
        color: '#fda4af',
        fase: 'menstrualDay',
      },
      {
        id: 2,
        dayCount: Number(
          Math.round(daysCycleComplete / 2 - 5) - cycleChart?.daysOfBleeding
        ),
        label: 'Días Infértiles',
        color: '#bfdbfe',
        fase: 'folicularDay',
      },
      {
        id: 3,
        dayCount: 5,
        label: 'Dias Fértiles',
        color: '#d9f99d',
        fase: 'fertileDay',
      },
      {
        id: 4,
        dayCount: Number(
          daysCycleComplete - cycleChart?.daysOfBleeding - 3 - 5
        ),
        label: 'Días Infértiles',
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
        fontSize: 14,
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
      strokes: ['white'],
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
    cycleChart: Cycle,
    initDay?: any
  ): AgPolarSeriesOptions {
    const daysCycleComplete = this.setDaysCycleComplete(
      this.myRegisterQuestion,
      this.cyclesWithOutEndNull
    );
    const newDataArray: DataPieChartChildren[] = [];
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

    const diff =
      new Date().getDate() - new Date(this.cycleChart?.dateBeging)?.getDate();
    const dataChildrenSeries: DataPieChartChildren[] = newDataArray.map(
      (item: any) => {
        item.width = (newDataArray.length / sumaTotal) * 100;
        if (item.id === diff) {
          item.color = 'red';
        } else if (item.id === daysCycleComplete - 1) {
          item.color = 'black';
        } else if (item.id === Math.round(daysCycleComplete / 2)) {
          item.color = 'green';
        }
        return item;
      }
    );

    if (newDataArray) {
      this.store.dispatch(
        setCycleState({
          cycleState: {
            ovulationNumber: Math.round(daysCycleComplete / 2),
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
        nodeClick: (event: any) => {
          // this.router.navigate(['calendario']); //pie de numeros
        },
      },
      sectorLabelKey: 'id',
      angleKey: 'width',
      sectorLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: 15,
      },
      fills: dataChildrenSeries.map((item: any) => item.color),
      strokeWidth: 2,
      strokes: ['white'],
      tooltip: {
        renderer: ({ datum, color, sectorLabelKey }) => {
          if (datum.color === 'red') {
            datum['desc'] = 'Está aquí';
          } else if (datum.color === 'green') {
            datum['desc'] = 'Ovulación';
          } else if (datum.color === 'black') {
            datum['desc'] = 'Fin del ciclo';
          }
          return [
            `<div style="background-color: ${color}; padding: 4px 8px; border-top-left-radius: 5px; border-top-right-radius: 5px; color: white; font-weight: bold;">`,
            datum['desc'] || datum['label'],
            `</div>`,
            `<div style="padding: 10px 8px;">`,
            `  <strong class="flex justify-between"><p>Día ${datum.id}</p><a href="https://femfy-stage.vercel.app/calendario"><i class="fa fa-calendar" style="color: red;" aria-hidden="true"></i></a></strong>`,
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

  setDaysCycleComplete(
    myRegisterQuestion?: QuestionUserMenstruation,
    cyclesWithOutEndNull?: Cycle[] | any
  ): number {
    let result = 0;
    if (cyclesWithOutEndNull.length > 0) {
      for (const cycle of cyclesWithOutEndNull) {
        const dateBeging: any = new Date(cycle?.dateBeging);
        const dateEnd: any = new Date(cycle?.dateEnd);

        const differencesMiliseconds = dateEnd - dateBeging;
        const differenceDays = differencesMiliseconds / (1000 * 60 * 60 * 24);
        result += differenceDays;
      }
    }

    let countDays = [];
    countDays.push(myRegisterQuestion?.lastCycleDuration);
    countDays.push(myRegisterQuestion?.regularCycleDuration);
    if (cyclesWithOutEndNull.length > 0) {
      countDays.push(result / cyclesWithOutEndNull?.length);
    }

    const total = countDays?.reduce(
      (acumulador: any, numero: any) => acumulador + numero,
      0
    );

    this.store.dispatch(
      setDayOfOvulation({
        numberOvulation: Math.round(total / countDays.length / 2),
      })
    );

    return Math.round(total / countDays.length);
  }

  //STYLE RESPONSE

  getWindowSize(): number {
    let value = 400;
    if (window.innerWidth < 380) {
      value = 300;
    } else if (window.innerWidth < 500) {
      value = 340;
    } else if (window.innerWidth < 1024) {
      value = 390;
    } else if (window.innerWidth < 1100) {
      value = 270;
    } else if (window.innerWidth < 1200) {
      value = 290;
    } else {
      value = 320;
    }
    return value;
  }

  @HostListener('window:resize', ['$event'])
  onResizeWidth(event: any): void {
    if (window.innerWidth < 380) {
      this.sizeChart = 300;
    } else if (window.innerWidth < 500) {
      this.sizeChart = 340;
    } else if (window.innerWidth < 1024) {
      this.sizeChart = 390;
    } else if (window.innerWidth < 1100) {
      this.sizeChart = 270;
    } else if (window.innerWidth < 1200) {
      this.sizeChart = 290;
    } else {
      this.sizeChart = 320;
    }
    this.options = {
      ...this.options,
      width: this.sizeChart,
      height: this.sizeChart,
    };
  }
}
