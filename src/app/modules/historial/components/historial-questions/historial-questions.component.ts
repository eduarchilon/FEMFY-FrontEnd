import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HistorialService } from './../../../../services/historial/historial.service';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyQuestionHistoryResponse } from 'src/app/models/historial.model';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}
@Component({
  selector: 'app-historial-questions',
  templateUrl: './historial-questions.component.html',
  styleUrls: ['./historial-questions.component.scss'],
})
export class HistorialQuestionsComponent {

  constructor(private historialService: HistorialService, private localStorageService: LocalStorageService) {
  }

  // panelOpenStateProper = false;
  // mostrarDivMenopausia = false;

  // preguntasCancerMama: string[] = [
  //   'En tu familia, ¿alguien ha recibido un diagnóstico de cáncer de mama?',
  // ];
  // preguntasCancerOvario: string[] = [
  //   'En tu familia, ¿Existe un historial de cáncer de ovario en tu familia?',
  // ]
  // preguntasEndometriosis: string[] = [
  //   'En tu familia, ¿Alguna de las mujeres en tu familia ha sido diagnosticada con endometriosis?',
  // ]
  // preguntasOvarioPoliquistico: string[] = [
  //   '¿Alguna de tus parientes cercanas ha sido diagnosticada con el síndrome de ovario poliquístico?',
  // ]
  // preguntasMenopausiaTemprana: string[] = [
  //   '¿Tienes algún conocido en tu familia que haya experimentado la menopausia a una edad temprana?',
  // ]
  // preguntasMioma: string[] = [
  //   '¿Tienes conocimiento de si algún miembro de tu familia ha tenido miomas uterinos?',
  // ];

  // question: string = this.preguntasCancerMama[0];
  // questionValue: string = 'preguntasCancerMama';

  // submitHistorial(value: string, form: string): void {
  //   console.log(value, form);
  //   switch (form) {
  //     case 'preguntasCancerMama':
  //       this.historialService.updateUserHistoryQuestion({
  //         id: this.localStorageService.getUserByLogin()?.idHistorial,
  //         breastCancer: value === '1' ? true : false,
  //         userId: this.localStorageService.getUserByLogin()?.idUser
  //       }).subscribe((res: any) => res);
  //       break;
  //     case 'preguntasCancerOvario':
  //       this.historialService.updateUserHistoryQuestion({ 
  //         id: this.localStorageService.getUserByLogin()?.idHistorial,
  //         ovarianCancer: value === '1' ? true : false,
  //         userId: this.localStorageService.getUserByLogin()?.idUser
  //       }).subscribe((res: any) => res);
  //       break;
  //     case 'preguntasEndometriosis':
  //       this.historialService.updateUserHistoryQuestion({
  //         id: this.localStorageService.getUserByLogin()?.idHistorial,
  //         endometriosis: value === '1' ? true : false,
  //         userId: this.localStorageService.getUserByLogin()?.idUser
  //       }).subscribe((res: any) => res);
  //       break;
  //     case 'preguntasOvarioPoliquistico':
  //       this.historialService.updateUserHistoryQuestion({
  //         id: this.localStorageService.getUserByLogin()?.idHistorial,
  //         sop: value === '1' ? true : false,
  //         userId: this.localStorageService.getUserByLogin()?.idUser
  //       }).subscribe((res: any) => res);
  //       break;
  //     case 'preguntasMenopausiaTemprana':
  //       this.historialService.updateUserHistoryQuestion({
  //         id: this.localStorageService.getUserByLogin()?.idHistorial,
  //         earlyMenopause: value === '1' ? true : false,
  //         userId: this.localStorageService.getUserByLogin()?.idUser
  //       }).subscribe((res: any) => res);
  //       break;
  //     case 'preguntasMioma':
  //       this.historialService.updateUserHistoryQuestion({
  //         id: this.localStorageService.getUserByLogin()?.idHistorial,
  //         uterineFibroids: value === '1' ? true : false,
  //         userId: this.localStorageService.getUserByLogin()?.idUser
  //       }).subscribe((res: any) => res);        break;
  //     default:
  //       break;
  //   }
  // }

  // toggleDivCancerMama() {
  //   this.question = this.preguntasCancerMama[0];
  //   this.questionValue = 'pregustasCancerMama';
  // }

  // toggleDivCancerOvario() {
  //   this.question = this.preguntasCancerOvario[0];
  //   this.questionValue = 'preguntasCancerOvario';
  // }

  // toggleDivEndiometriosis() {
  //   this.question = this.preguntasEndometriosis[0];
  //   this.question = 'preguntasEndometriosis';
  // }

  // toggleDivMioma() {
  //   this.question = this.preguntasMioma[0];
  //   this.questionValue = 'preguntasMioma';
  // }

  // toggleDivPoliquistico() {
  //   this.question = this.preguntasOvarioPoliquistico[0];
  //   this.questionValue = 'preguntasOvarioPoliquistico';
  // }

  // toggleDivMenopausia() {
  //   this.question = this.preguntasMenopausiaTemprana[0];
  //   this.questionValue = 'preguntasMenopausiaTemprana';
  // }
}