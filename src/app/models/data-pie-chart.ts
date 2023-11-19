import * as moment from 'moment';

export interface DataPieChart {
  id: number;
  dayCount: number;
  label: string;
  color: string;
  fase?: string;
  isOvulation?: boolean;
  desc?: string | '';
}

export interface DataPieChartChildren extends DataPieChart {
  width: number;
  desc?: string | '';
  date?: moment.Moment | any | string;
  hour?: string | any;
}
