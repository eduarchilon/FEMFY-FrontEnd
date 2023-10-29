import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ThemePalette } from '@angular/material/core';
import { NgFor } from '@angular/common';

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
  panelOpenStateProper = false;
  mostrarDivCancerMama = true;
  mostrarDivCancerOvario = false;
  mostrarDivEndiometrosis = false;
  mostrarDivMioma = false;
  mostrarDivPoliquistico = false;
  mostrarDivMenopausia = false;
 
  @Input() preguntasCancerMama: string[] = [
    'En tu familia, ¿alguien ha recibido un diagnóstico de cáncer de mama?',
  ];
  @Input() preguntasCancerOvario: string[] = [
    'En tu familia, ¿Existe un historial de cáncer de ovario en tu familia?',
  ]
  @Input() preguntasEndometriosis: string[] = [
    'En tu familia, ¿Alguna de las mujeres en tu familia ha sido diagnosticada con endometriosis?',
  ]
  @Input() preguntasOvarioPoliquistico: string[] = [
    '¿Alguna de tus parientes cercanas ha sido diagnosticada con el síndrome de ovario poliquístico?',
  ]
  @Input() preguntasMenopausiaTemprana: string[] = [
    '¿Tienes algún conocido en tu familia que haya experimentado la menopausia a una edad temprana?',
  ]
  @Input() preguntasMioma: string[] = [
    '¿Tienes conocimiento de si algún miembro de tu familia ha tenido miomas uterinos?',
  ];

  toggleDivCancerMama() {
    this.mostrarDivCancerMama = !this.mostrarDivCancerMama;
    this.mostrarDivCancerOvario = false;
    this.mostrarDivEndiometrosis = false;
    this.mostrarDivMioma = false;
    this.mostrarDivMenopausia = false;
    this.mostrarDivPoliquistico = false;
  }

  toggleDivCancerOvario() {
    this.mostrarDivCancerOvario = !this.mostrarDivCancerOvario;
    this.mostrarDivCancerMama = false;
    this.mostrarDivEndiometrosis = false;
    this.mostrarDivMioma = false;
    this.mostrarDivMenopausia = false;
    this.mostrarDivPoliquistico = false;
  }

  toggleDivEndiometriosis() {
    this.mostrarDivEndiometrosis = !this.mostrarDivEndiometrosis;
    this.mostrarDivCancerMama = false;
    this.mostrarDivCancerOvario = false;
    this.mostrarDivMioma = false;
    this.mostrarDivMenopausia = false;
    this.mostrarDivPoliquistico = false;
  }

  toggleDivMioma() {
    this.mostrarDivMioma = !this.mostrarDivMioma;
    this.mostrarDivCancerMama = false;
    this.mostrarDivCancerOvario = false;
    this.mostrarDivEndiometrosis = false;
    this.mostrarDivMenopausia = false;
    this.mostrarDivPoliquistico = false;
  }

  toggleDivPoliquistico(){
    this.mostrarDivPoliquistico = !this.mostrarDivPoliquistico;
    this.mostrarDivCancerMama = false;
    this.mostrarDivCancerOvario = false;
    this.mostrarDivEndiometrosis = false;
    this.mostrarDivMioma = false;
    this.mostrarDivMenopausia = false;

  }

  toggleDivMenopausia() {
    this.mostrarDivMenopausia = !this.mostrarDivMenopausia;
    this.mostrarDivCancerMama = false;
    this.mostrarDivCancerOvario = false;
    this.mostrarDivEndiometrosis = false;
    this.mostrarDivMioma = false;
    this.mostrarDivPoliquistico = false;
  }
}