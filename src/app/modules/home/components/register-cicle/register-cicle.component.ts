import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setCycle } from 'src/app/services/redux/actions/cycle.action';
import { selectUserLogin } from 'src/app/services/redux/selectors/login.selector';
import { AppState } from 'src/app/services/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { constants } from 'src/app/constans/constants';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification/notification.service';
import * as moment from 'moment';
import { cycleUserInit } from 'src/app/services/redux/actions/cycle/cycle-user.page.action';

@Component({
  selector: 'app-register-cicle',
  templateUrl: './register-cicle.component.html',
  styleUrls: ['./register-cicle.component.scss'],
})
export class RegisterCicleComponent implements OnInit {
  panelOpenState = false;

  formCycle: FormGroup = new FormGroup({
    dateBeging: new FormControl('', Validators.required),
    daysOfBleeding: new FormControl('', [
      Validators.required,
      this.validateDaysOfBleeding,
    ]),
  });

  idUser!: number;

  spinnerConsumer: string = 'RegisterCicleComponent';

  constructor(
    private dialogRef: MatDialogRef<RegisterCicleComponent>,
    private cicleService: CicleService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
    this.formCycle.reset();
  }

  registerCycle(): void {
    const isDateAfterToday = moment(
      new Date(this.formCycle?.value?.dateBeging)
    ).isAfter(moment(), 'day');
    if (isDateAfterToday) {
      this.errorDate = 'El Inicio del ciclo no puede ser mayor al día de hoy.';
    } else {
      if (this.data?.id) {
        this.cicleService
          .deleteCycle(this.data?.id)
          .subscribe((res: any) => res);
      }
      this.cicleService
        .registerCycle({
          dateBeging: new Date(this.formCycle?.value?.dateBeging),
          daysOfBleeding: this.formCycle?.value?.daysOfBleeding,
          idUser: this.localStorageService.getUserByLogin()?.idUser,
        })
        .subscribe({
          next: (response: any) => {
            this.loaderService.showLoader();
            this.localStorageService.setKeyValueLocalStorage(
              constants.USER,
              JSON.stringify({
                ...this.localStorageService.getUserByLogin(),
                idCycle: response?.id,
              })
            );
            this.closeDialog();
            this.notificationService
              .enviarNotificacion(
                'Ha registrado un nuevo ciclo',
                'Este nuevo ciclo reemplazará al que estaba seteado porque no ha finalizado. 😊'
              )
              .subscribe({
                next: (res: any) => res,
              });
            this.loaderService.showLoader();
            if (response) {
              this.router.navigate(['/']).then(() => {
                location.reload();
                // this.openSnackBar('Registro creado', 'OK');
              });
              this.loaderService.showLoader();
              return response;
            }
            this.loaderService.hideLoader();
          },
          error: (error) => error,
        });
    }
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action);
  }

  validateDaysOfBleeding(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value > 8) {
      return { maxDays: true };
    }
    return null;
  }
  errorDate!: string;
}
