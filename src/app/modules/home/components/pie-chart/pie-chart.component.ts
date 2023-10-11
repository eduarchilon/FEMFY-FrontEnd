import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgPolarChartOptions, AgPolarSeriesOptions } from 'ag-charts-community';
import { data, dataChildren } from 'src/app/constans/pie-chart-data';
import { Cycle } from 'src/app/models/cicle.model';
import {
  DataPieChart,
  DataPieChartChildren,
} from 'src/app/models/data-pie-chart';
import { setCycle } from 'src/app/redux/actions/cycle.action';
import { selectCycle } from 'src/app/redux/selectors/cycle.selctor';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  //PIE-CHART
  options!: AgPolarChartOptions;
  sizeChart: number = 0;
  dateBegind!: Date;
  cycleChart!: Cycle;
  idUser!: number;

  constructor(
    private store: Store<AppState>,
    private cicleService: CicleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.idUser = data?.idUser;
    });

    let chat12: AgPolarSeriesOptions = {};
    let chat13: AgPolarSeriesOptions = {};
    if (!this.cycleChart) {
      this.cicleService.getAllCycles(this.idUser).subscribe((data: Cycle[]) => {
        this.cycleChart = data[data?.length - 1];
        console.log(this.cycleChart);
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
      });
    }
    // this.store.select(selectCycle).subscribe((data: any) => {
    //   console.log(data);

    //   this.cycleChart = data?.cycle;

    //   chat12 = this.setPieChartContentData(this.cycleChart);
    //   chat13 = this.setPieContainerData(chat12, this.cycleChart);
    //   this.options = {
    //     width: this.getWindowSize(),
    //     height: this.getWindowSize(),
    //     autoSize: true,
    //     padding: {
    //       top: 5,
    //       right: 5,
    //       bottom: 5,
    //       left: 5,
    //     },
    //     series: [chat12, chat13],
    //     legend: {
    //       enabled: false,
    //     },
    //     background: {
    //       visible: false,
    //     },
    //   };
    // });

    this.sizeChart = window.innerWidth;
  }

  setPieChartContentData(cycleChart: Cycle): AgPolarSeriesOptions {
    let dateChart = new Date(cycleChart?.dateBeging || '');
    const fechaFinal = new Date('2023-10-15'); //new Date(cycleChart?.dateEnd || '');
    // Calcula la diferencia en milisegundos
    const diferenciaMilisegundos = fechaFinal.getTime() - dateChart.getTime();
    // Calcula la diferencia en días
    const diferenciaDias = Math.ceil(
      diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );

    let data: DataPieChart[] = [
      {
        id: 1,
        dayCount: cycleChart?.daysOfBleeding, //duracion de sangrado
        label: 'Sangrado',
        color: '#fda4af',
      },
      {
        id: 2,
        dayCount: 6,
        label: '1er. Periodo seguro',
        color: '#bfdbfe',
      },
      {
        id: 3,
        dayCount: 4,
        label: 'Dias fertiles',
        color: '#d9f99d',
      },
      {
        id: 4,
        dayCount: 10,
        label: '2do. Periodo seguro',
        color: '#bfdbfe',
      },
    ];
    return {
      type: 'pie',
      data: data,
      outerRadiusRatio: 0.8,
      showInLegend: false,
      listeners: {
        nodeClick: (event: any) => {
          handleChart('Pie 1', event?.datum);
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
    const categorizedData: CategorizedData = {};
    // data.forEach((item) => {
    //   const label = item.label;
    //   if (!categorizedData[label]) {
    //     categorizedData[label] = [];
    //   }
    //   categorizedData[label].push(item);
    // });
    // console.log(categorizedData)
    const newDataArray: DataPieChartChildren[] = [];
    optionSeries?.data?.forEach((item: any) => {
      for (let i = 1; i <= item.dayCount; i++) {
        newDataArray.push({
          id: newDataArray.length + 1,
          dayCount: 1,
          label: item.label,
          color: item.color,
          width: 0,
        });
      }
    });
    const sumaTotal = newDataArray.reduce((acumulador, elemento) => {
      return acumulador + elemento.dayCount;
    }, 0);

    const fechaActual = new Date().getDate();
    // Calcula los valores de "width" y normaliza para que sumen 100%
    const dataChildrenSeries: DataPieChartChildren[] = newDataArray.map(
      (item: any) => ({
        ...item,
        width: (newDataArray.length / sumaTotal) * 100,
        color: item.id === dataChildren[0]?.id ? 'purple' : item.color,
      })
    );

    return {
      type: 'pie',
      data: dataChildrenSeries,
      innerRadiusRatio: 0.8,
      listeners: {
        nodeClick: (event: any) => {
          handleChart('Pie 2', event?.datum);
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
        renderer: () => '',
        interaction: {
          enabled: false,
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
    console.log(window.innerWidth);
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

interface CategorizedData {
  [label: string]: DataPieChart[];
}

function handleChart(type: string, event: any): void {
  console.log(type, event);
}
