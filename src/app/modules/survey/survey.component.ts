import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/constans/constants';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/**
 * @title Basic radios
 */
@Component({
  selector: 'radio-overview-example',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.scss'],
})
export class SurveyComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  preguntas: string[] = [
    'Pregunta 1. ¿Ya tuviste tu primera menstruación?',
    'Pregunta 2. ¿Qué día fue tu última menstruación?',
    'Pregunta 3. ¿Que duración tuvo tu último período?',
    'Pregunta 4. ¿Sos Regular o Irregluar?',
  ];

  omitBasicForm(): void {
    this.router.navigate(['']);
    // this.localStorageService.deleteValue(constants.ID_REGISTER);
  }

  showSkipButton = false;

  toggleSkipButtonVisibility(show: boolean) {
    this.showSkipButton = show;
  }
}
