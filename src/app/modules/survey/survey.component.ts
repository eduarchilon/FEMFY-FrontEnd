import {Component} from '@angular/core';
import { Router } from '@angular/router';


/**
 * @title Basic radios
 */
@Component({
  selector: 'radio-overview-example',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.scss']
})
export class SurveyComponent {

  constructor(private router: Router) {}

  preguntas: string[] = [
    'Pregunta 1. ¿Ya tuviste tu primera menstruación?',
    'Pregunta 2. ¿Qué día fue tu última menstruación?',
    'Pregunta 3. ¿Que duración tuvo tu último período?',
    'Pregunta 4. ¿Sos Regular o Irregluar?'
  ];

  indicePreguntaActual: number = 0;

  mostrarSiguientePregunta() {
    if (this.indicePreguntaActual < this.preguntas.length - 1) {
      this.indicePreguntaActual++;
    }
  }

}