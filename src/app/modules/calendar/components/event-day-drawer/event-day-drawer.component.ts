import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-event-day-drawer',
  templateUrl: './event-day-drawer.component.html',
  styleUrls: ['./event-day-drawer.component.scss'],
})
export class EventDayDrawerComponent implements OnInit {
  panelOpenState = false;
  userResponse!: UserResponse;
  hourSelected: string = '';

  formRegisterEvent: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
  });

  spinnerConsumer: string = 'EventDayDrawerComponent';

  constructor(
    private dialogRef: MatDialogRef<EventDayDrawerComponent>,
    private calendarService: CalendarService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private spinnerService: SpinnerService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any //fecha
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
    });
  }

  setHourToShow(hour: string) {
    this.hourSelected = hour;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  registerEevent(): void {
    this.calendarService
      .setEvent({
        idUser: this.userResponse?.idUser,
        description: this.formRegisterEvent?.value?.description,
        title: this.formRegisterEvent?.value?.title,
        hour: this.formRegisterEvent?.value?.hour,
        date: this.data,
      })
      .subscribe({
        next: (response: any) => {
          this.spinnerService.showProgressSpinner(this.spinnerConsumer);
          if (response) {
            this.closeDialog();
            this.spinnerService.hideProgressSpinner(this.spinnerConsumer);
            this.router.navigate(['/calendario']).then(() => {
              location.reload();
            });
          } else {
            this.spinnerService.hideProgressSpinner(this.spinnerConsumer);
          }
        },
        error: (error) => error,
      });
  }
}
