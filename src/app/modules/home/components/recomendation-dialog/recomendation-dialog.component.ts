import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-recomendation-dialog',
  templateUrl: './recomendation-dialog.component.html',
  styleUrls: ['./recomendation-dialog.component.scss'],
})
export class RecomendationDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RecomendationDialogComponent>,
    private localStorageService: LocalStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any //fecha,
  ) {}

  recomendation: any;

  ngOnInit(): void {
    this.recomendation = this.data?.recommendation
    console.log(this.data?.recommendation);
  }
  
}
