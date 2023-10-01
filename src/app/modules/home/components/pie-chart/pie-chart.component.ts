import { Component, HostListener, OnInit } from '@angular/core';
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
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
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
