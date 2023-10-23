import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_ICONS } from 'src/app/constans/mat-icon.data';

@Injectable({
  providedIn: 'root',
})
export class MatIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  registerMatIcons(): void {
    return MAT_ICONS.forEach((icon: any) => {
      this.matIconRegistry.addSvgIcon(
        icon.name.toString(),
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path.toString())
      );
    });
  }
}
