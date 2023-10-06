import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-day-drawer',
  templateUrl: './event-day-drawer.component.html',
  styleUrls: ['./event-day-drawer.component.scss'],
})
export class EventDayDrawerComponent {
  panelOpenState = false;

  constructor(private dialogRef: MatDialogRef<EventDayDrawerComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
