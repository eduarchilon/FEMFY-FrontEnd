import {Component} from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

/**
 * @title Basic radios
 */
@Component({
  selector: 'radio-overview-example',
  templateUrl: 'survey.component.html',
  styleUrls: ['survey.component.scss'],
  standalone: true,
  imports: [MatRadioModule],
})
export class SurveyComponent {}