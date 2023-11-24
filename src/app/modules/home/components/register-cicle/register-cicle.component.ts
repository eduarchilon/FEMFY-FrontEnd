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
import { Cycle } from 'src/app/models/cicle.model';

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

  cycles!: Cycle[] | any;

  idUser!: number | any;

  spinnerConsumer: string = 'RegisterCicleComponent';
  errorDate!: string;
  errorDateBeging!: string;
  dateChangeValue!: string;

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

  ngOnInit(): void {
    this.idUser = this.localStorageService.getUserByLogin()?.idUser;
    this.cicleService.getAllCycles(this.idUser).subscribe({
      next: (res: any) => {
        this.cycles = res;
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.formCycle.reset();
  }

  registerCycle(): void {
    const filterCycles: Cycle[] = this.cycles?.filter(
      (item: Cycle | any) => item?.dateEnd !== null
    );

    let validateDate: boolean = false;
    filterCycles?.forEach((item: Cycle) => {
      console.log(moment(item?.dateBeging).month());
      console.log(moment(this.dateChangeValue).date());

      if (item?.dateBeging === this.dateChangeValue) {
        validateDate = true;
      } else if (moment(this.dateChangeValue).isBefore(moment(item?.dateEnd))) {
        validateDate = true;
      } else {
        validateDate = false;
      }
    });

    const isDateAfterToday = moment(
      new Date(this.formCycle?.value?.dateBeging)
    ).isAfter(moment(), 'day');
    if (isDateAfterToday) {
      this.errorDate = 'El Inicio del ciclo no puede ser mayor al día de hoy.';
    } else if (validateDate) {
      this.errorDateBeging = 'Ya existe un ciclo anterior con esa fecha.';
    } else {
      if (this.data?.id) {
        this.cicleService
          .deleteCycle(this.data?.id)
          .subscribe((res: any) => res);
      }
      this.cicleService
        .registerCycle({
          dateBeging: this.formCycle?.value?.dateBeging,
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
    if (value > 7) {
      return { maxDays: true };
    }
    return null;
  }

  onDateChange(event: any): void {
    this.errorDateBeging = '';
    this.dateChangeValue = event?.target?.value;
  }
}
