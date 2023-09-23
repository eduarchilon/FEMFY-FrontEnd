import {
  Component,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AgPolarChartOptions, AgPolarSeriesOptions } from 'ag-charts-community';
import { data, dataChildren } from 'src/app/constans/pie-chart-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  //PIE-CHART
  options!: AgPolarChartOptions;
  sizeChart: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.sizeChart = window.innerWidth;
    this.options = {
      width: this.getWindowSize(),
      height: this.getWindowSize(),
      autoSize: true,
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      series: [chat1, chat2],
      legend: {
        enabled: false,
      },
      background: {
        visible: false,
      },
    };
  }

  getWindowSize(): number {
    let value = 400;
    if (window.innerWidth < 380) {
      value = 300;
    } else if (window.innerWidth < 500) {
      value = 350;
    } else if (window.innerWidth < 1024) {
      value = 400;
    } else if (window.innerWidth < 1100) {
      value = 280;
    } else if (window.innerWidth < 1200) {
      value = 300;
    } else {
      value = 350;
    }
    return value;
  }

  @HostListener('window:resize', ['$event'])
  onResizeWidth(event: any): void {
    console.log(window.innerWidth);
    if (window.innerWidth < 380) {
      this.sizeChart = 300;
    } else if (window.innerWidth < 500) {
      this.sizeChart = 350;
    } else if (window.innerWidth < 1024) {
      this.sizeChart = 400;
    } else if (window.innerWidth < 1100) {
      this.sizeChart = 280;
    } else if (window.innerWidth < 1200) {
      this.sizeChart = 300;
    } else {
      this.sizeChart = 350;
    }
    this.options = {
      ...this.options,
      width: this.sizeChart,
      height: this.sizeChart,
    };
  }
}

function handleChart(type: string, event: any): void {
  console.log(type, event);
}

const chat1: AgPolarSeriesOptions = {
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
    renderer: ({ datum }) => {
      return [
        `<div style="background-color: ${datum.color}; padding: 4px 8px; border-top-left-radius: 5px; border-top-right-radius: 5px; color: black; font-weight: bold;">`,
        datum.label,
        `</div>`,
        `<div style="padding: 4px 8px;text-align: center;">`,
        `  <strong style="text-align: center;">${datum.dayCount} días</strong>`,
        `</div>`,
      ].join('\n');
    },
    position: {
      type: 'pointer',
    },
    showArrow: true,
  },
  highlightStyle: {
    item: {
      fillOpacity: 0,
      stroke: '#535455',
      strokeWidth: 1,
    },
  },
};

const chat2: AgPolarSeriesOptions = {
  type: 'pie',
  data: dataChildren,
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
  fills: dataChildren.map((item: any) => item.color),
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
