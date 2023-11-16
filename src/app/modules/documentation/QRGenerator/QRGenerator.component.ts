import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-QRGenerator',
  templateUrl: './QRGenerator.component.html',
  styleUrls: ['./QRGenerator.component.scss'],
})
export class QRGeneratorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<QRGeneratorComponent>,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public study: any,
  ) {}

  ngOnInit(): void {
    console.log(this.study);

  }

  copyToClipboard(text: string): void {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Puedes agregar alguna lógica adicional aquí, como mostrar un mensaje de éxito
    alert('Enlace copiado al portapapeles');
  }

  shareStudy(text: string): void {
    if ('share' in navigator) {
      this.shareLink(text);
    } else {
      this.copyToClipboard(text);
    }
  }

  async shareLink(url: string): Promise<void> {
    try {
      await navigator.share({
        text: '¡Mira este enlace!',
        url,
      });
      console.log('Enlace compartido con éxito');
    } catch (error) {
      console.error('Error al compartir el enlace', error);
    }
  }

  
}
