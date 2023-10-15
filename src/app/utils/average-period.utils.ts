export function setPeriodBaseQuestion(
  lastTime: Date,
  lastCycleDuration: string | number = 0,
  regularCycleDuration: string | number = 0,
  bleedingDuration: string | number | any = 0
): Date | any {
  const resultCycle =
    Number(lastCycleDuration) + Number(regularCycleDuration) / 2;

  const fechaOriginal = lastTime;

  // Restar días
  const diasEnMilisegundos = bleedingDuration * 24 * 60 * 60 * 1000; // días en milisegundos
  const nuevaFecha = new Date(fechaOriginal.getTime() - diasEnMilisegundos);

  // Obtener los componentes de la fecha
  const anio = nuevaFecha.getFullYear();
  const mes = nuevaFecha.getMonth() + 1; // El mes se indexa desde 0 (enero) a 11 (diciembre)
  const dia = nuevaFecha.getDate();

  // Sumar resultCycle a la fecha
  const nuevaFechaConCiclo = new Date(anio, mes, dia);
  nuevaFechaConCiclo.setDate(nuevaFechaConCiclo.getDate() + resultCycle);

  return nuevaFechaConCiclo;
}

//diferencia de dias para el inicio del peridoo en hoistirial
export function calculateCycleDurantionWithDates(
  dateBeging: Date | any,
  dateEnd: Date | any
): number {
  const diferenciaMilisegundos = dateEnd - dateBeging;
  const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
  return diferenciaDias;
}
