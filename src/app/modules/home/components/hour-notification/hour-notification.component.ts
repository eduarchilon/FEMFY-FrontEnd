import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-hour-notification',
  templateUrl: './hour-notification.component.html',
  styleUrls: ['./hour-notification.component.scss'],
})
export class HourNotificationComponent implements OnInit {
  userResponse!: UserResponse;

  constructor(
    private dialogRef: MatDialogRef<HourNotificationComponent>,
    private cicleService: CicleService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveHour(event: any) {
    const emotionHour = event;

    const userData: UserResponse = {
      ...this.userResponse,
      emotion: emotionHour,
    };

    this.authService.updateUser({ ...userData }).subscribe({
      next: (res: any) => {
        if (res) {
          this._snackBar.open('Hora actualizada con éxito.', 'cerrar', {
            duration: 5000, // Duración en milisegundos
          });
          this.closeDialog();
          location.reload();
        }
      },
    });
  }
}
