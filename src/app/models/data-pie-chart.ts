export interface DataPieChart {
  id: number;
  dayCount: number;
  label: string;
  color: string;
}

export interface DataPieChartChildren extends DataPieChart {
  width: number;
}
