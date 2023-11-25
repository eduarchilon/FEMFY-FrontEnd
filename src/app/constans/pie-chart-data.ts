import { DataPieChart, DataPieChartChildren } from '../models/data-pie-chart';

export function obtenerDíasEnMesActual() {
  const fechaActual = new Date();
  // Obtiene el mes actual (0-11, donde 0 es enero y 11 es diciembre)
  const mesActual = fechaActual.getMonth();
  // Obtiene el año actual
  const añoActual = fechaActual.getFullYear();
  // Crea una nueva fecha para el último día del mes actual
  const ultimoDiaDelMes = new Date(añoActual, mesActual + 1, 0);
  // Obtiene el número de día del último día del mes actual
  const numeroDeDías = ultimoDiaDelMes.getDate();
  return numeroDeDías;
}

const DíasEnMesActual = obtenerDíasEnMesActual();
const DíasRestantes = DíasEnMesActual - (5 + 6 + 5);

export const data: DataPieChart[] = [
  {
    id: 1,
    dayCount: obtenerDíasEnMesActual() - (obtenerDíasEnMesActual() - 5),
    label: 'Sangrado',
    color: '#fda4af',
  },
  {
    id: 2,
    dayCount: obtenerDíasEnMesActual() - (obtenerDíasEnMesActual() - 6),
    label: 'Periodo seguro',
    color: '#bfdbfe',
  },
  {
    id: 3,
    dayCount: obtenerDíasEnMesActual() - (obtenerDíasEnMesActual() - 5),
    label: 'Días fértiles',
    color: '#d9f99d',
  },
  {
    id: 4,
    dayCount: DíasRestantes,
    label: 'Periodo seguro',
    color: '#bfdbfe',
  },
];

export let data2: DataPieChartChildren[] = [
  {
    id: 1,
    dayCount: 1,
    label: 'Sangrado',
    color: 'red',
    width: 0,
  },
  {
    id: 2,
    dayCount: 1,
    label: 'Sangrado',
    color: 'red',
    width: 0,
  },
  {
    id: 3,
    dayCount: 1,
    label: 'Sangrado',
    color: 'red',
    width: 0,
  },
  {
    id: 4,
    dayCount: 1,
    label: 'Sangrado',
    color: 'red',
    width: 0,
  },
  {
    id: 5,
    dayCount: 1,
    label: 'Sangrado',
    color: 'red',
    width: 0,
  },
  //PERIODO SEGURO
  {
    id: 6,
    dayCount: 6,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 7,
    dayCount: 6,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 8,
    dayCount: 6,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 9,
    dayCount: 6,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 10,
    dayCount: 6,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 11,
    dayCount: 6,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  //Días fértiles
  {
    id: 12,
    dayCount: 5,
    label: 'Días fértiles',
    color: '#84cc16',
    width: 0,
  },
  {
    id: 13,
    dayCount: 5,
    label: 'Días fértiles',
    color: '#84cc16',
    width: 0,
  },
  {
    id: 14,
    dayCount: 5,
    label: 'Días fértiles',
    color: '#84cc16',
    width: 0,
  },
  {
    id: 15,
    dayCount: 5,
    label: 'Días fértiles',
    color: '#84cc16',
    width: 0,
  },
  {
    id: 16,
    dayCount: 5,
    label: 'Días fértiles',
    color: '#84cc16',
    width: 0,
  },
  //Periodo seguro
  {
    id: 17,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 18,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 19,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 20,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 21,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 22,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 23,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 24,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 25,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 26,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 27,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 28,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 29,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 30,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
  {
    id: 31,
    dayCount: 14,
    label: 'Periodo seguro',
    color: '#3b82f6',
    width: 0,
  },
];

const sumaTotal = data2.reduce((acumulador, elemento) => {
  return acumulador + elemento.dayCount;
}, 0);

const fechaActual = new Date().getDate();
// Calcula los valores de "width" y normaliza para que sumen 100%
export const dataChildren: DataPieChartChildren[] = data2.map((item: any) => ({
  ...item,
  width: (data2.length / sumaTotal) * 100,
  color: item.id === fechaActual ? 'purple' : item.color,
}));
