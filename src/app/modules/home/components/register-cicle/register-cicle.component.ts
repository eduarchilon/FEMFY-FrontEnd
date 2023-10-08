import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setCycle } from 'src/app/redux/actions/cycle.action';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { CicleService } from 'src/app/services/cicle/cicle.service';

@Component({
  selector: 'app-register-cicle',
  templateUrl: './register-cicle.component.html',
  styleUrls: ['./register-cicle.component.scss'],
})
export class RegisterCicleComponent implements OnInit {
  panelOpenState = false;

  formCycle: FormGroup = new FormGroup({
    dateBeging: new FormControl('', Validators.required),
    dateEnd: new FormControl('', Validators.required),
  });

  idUser!: number;

  constructor(
    private dialogRef: MatDialogRef<RegisterCicleComponent>,
    private cicleService: CicleService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.idUser = data?.idUser;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.formCycle.reset();
  }

  registerCycle(): void {
    this.cicleService
      .registerCycle({
        dateBeging: this.formCycle?.value?.dateBeging,
        dateEnd: this.formCycle?.value?.dateEnd,
        idUser: this.idUser,
      })
      .subscribe({
        next: (response: any) => {
          if (response) {
            return response;
            // this.store.dispatch(setCycle({ cycle: response }));
          }
        },
        error: (error) => error,
      });
  }

  // getRegoister(): void {
  //   this.cicleService
  //     .getCycle(this.idUser, '2023-10-07')
  //     .subscribe((data: any) => console.log(data));
  // }
}
