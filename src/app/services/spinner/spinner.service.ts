import {
  Injectable,
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
  ElementRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogState,
} from '@angular/material/dialog';
import { SpinnerComponent } from '../../commons/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinnerConsumers: string[] = [];

  dialogRefSpinner!: MatDialogRef<SpinnerComponent>;
  private renderer: Renderer2;

  constructor(
    public dialogSpinner: MatDialog,
    public rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showProgressSpinner(consumerName: string): void {
    this.addSpinConsumer(consumerName);
    this.openSpinner();
    document.body.style.cursor = 'wait';
  }

  hideProgressSpinner(consumerName: string): void {
    if (this.dialogRefSpinner) {
      this.removeSpinConsumer(consumerName);
      document.body.style.cursor = 'auto';
    }
  }

  addSpinConsumer(consumerName: string): void {
    if (!this.spinnerConsumers.some((value) => value === consumerName)) {
      this.spinnerConsumers.push(consumerName);
    }
  }

  removeSpinConsumer(consumerName: string): void {
    if (this.spinnerConsumers.some((value) => value === consumerName)) {
      const indx = this.spinnerConsumers.indexOf(consumerName);
      this.spinnerConsumers.splice(indx);
    }
    if (this.spinnerConsumers.length === 0) {
      this.dialogRefSpinner.close();
      document.body.style.cursor = 'auto';
    }
  }
  hideAllSpinner(): void {
    if (this.spinnerConsumers.length > 0) {
      this.spinnerConsumers.forEach((element) => {
        this.hideProgressSpinner(element);
      });
      document.body.style.cursor = 'auto';
    }
  }

  openSpinner(): void {
    if (
      this.dialogRefSpinner?.getState() === MatDialogState.CLOSING ||
      this.dialogRefSpinner?.getState() === MatDialogState.CLOSED ||
      !this.dialogRefSpinner
    ) {
      this.dialogRefSpinner = this.dialogSpinner.open(SpinnerComponent, {
        disableClose: true,
        panelClass: ['without-background', 'spinner-loading'],
      });
      this.toggleStyle();
    }
  }

  toggleStyle(): void {
    const dialogContainer = document.querySelector(
      '.mat-mdc-dialog-container .mdc-dialog__surface'
    );
    this.renderer.addClass(dialogContainer, 'spinner-loading');
    this.renderer.setStyle(
      dialogContainer,
      'background-color',
      'unset',
      RendererStyleFlags2.Important
    );
    this.renderer.setStyle(
      dialogContainer,
      'box-shadow',
      'unset',
      RendererStyleFlags2.Important
    );
  }
}
