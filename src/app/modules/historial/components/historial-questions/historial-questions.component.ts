import { Component } from '@angular/core';
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
  panelOpenState = false;
  mostrarDivCancerMama = true;
  mostrarDivCancerOvario = false;
  mostrarDivEndiometrosis = false;
  mostrarDivMioma = false;
  mostrarDivPoliquistico = false;
  mostrarDiv6 = false;
  mostrarDivMenopausia = false;

  availableColors: ChipColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'accent' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'accent' },
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