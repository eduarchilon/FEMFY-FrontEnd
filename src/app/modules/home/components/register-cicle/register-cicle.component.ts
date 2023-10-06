import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-cicle',
  templateUrl: './register-cicle.component.html',
  styleUrls: ['./register-cicle.component.scss'],
})
export class RegisterCicleComponent {
  panelOpenState = false;

  constructor(private dialogRef: MatDialogRef<RegisterCicleComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
