import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})


export class ConversationComponent {
  mostrarBoton1 = true;
  mostrarBoton2 = false;
  mostrarBoton3 = false;
  mostrarTextarea = false;
  contenidoTextarea = '';

  toggleTextarea() {
    this.mostrarBoton1 = !this.mostrarBoton1;
    this.mostrarTextarea = !this.mostrarTextarea;
    this.mostrarBoton2 = !this.mostrarBoton2;
    this.mostrarBoton3 = this.mostrarBoton2;
  }

  mostrarSoloBoton1() {
    if (this.contenidoTextarea.trim() !== '') {
      this.mostrarBoton1 = true;
      this.mostrarTextarea = false;
      this.mostrarBoton2 = false;
      this.mostrarBoton3 = false;
    }
  }

  mostrarBoton3Click() {
    this.mostrarBoton1 = true;
    this.mostrarTextarea = false;
    this.mostrarBoton2 = false;
    this.mostrarBoton3 = false;
  }

  onTextareaInput(event: any) {
    this.contenidoTextarea = event.target.value;
  }
}
