export interface DataPieChart {
  id: number;
  dayCount: number;
  label: string;
  color: string;
  fase?: string;
  isOvulation?: boolean;
}

export interface DataPieChartChildren extends DataPieChart {
  width: number;
}
