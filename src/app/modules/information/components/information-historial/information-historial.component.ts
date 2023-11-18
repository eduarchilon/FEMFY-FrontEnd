import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsUserFamilyHistory } from 'src/app/models/historial.model';
import { UserDataCycle, UserResponse } from 'src/app/models/user.model';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-information-historial',
  templateUrl: './information-historial.component.html',
  styleUrls: ['./information-historial.component.scss'],
})
export class InformationHistorialComponent implements OnInit {
  userResponse!: UserResponse;
  userDataCycle!: UserDataCycle;
  userHistorial: QuestionsUserFamilyHistory = {};

  constructor(
    private historyService: HistorialService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.userDataCycle = this.localStorageService.getUserDataCycle();
    this.historyService
      .getQuestionUserHistoryByIdUser(this.userResponse?.idUser)
      .subscribe((history: QuestionsUserFamilyHistory | any) => {
        this.userHistorial = history[0];
        this.formInformationHistorial = this.fb.group({
          breastCancer: [this.userHistorial.breastCancer],
          ovarianCancer: [this.userHistorial.ovarianCancer],
          endometriosis: [this.userHistorial.endometriosis],
          sop: [this.userHistorial.sop],
          earlyMenopause: [this.userHistorial.earlyMenopause],
          uterineFibroids: [this.userHistorial.uterineFibroids],
        });
      });
  }

  formInformationHistorial: FormGroup = new FormGroup({
    breastCancer: new FormControl(''),
    ovarianCancer: new FormControl(''),
    endometriosis: new FormControl(''),
    sop: new FormControl(''),
    earlyMenopause: new FormControl(''),
    uterineFibroids: new FormControl(''),
  })

  submitInformationHistorial(): void {
    this.historyService
    .updateUserHistoryQuestion({
      ...this.userHistorial,
      breastCancer: this.formInformationHistorial.value.breastCancer === false ? 0 : 1,
      ovarianCancer: this.formInformationHistorial.value.ovarianCancer === false ? 0 : 1,
      endometriosis: this.formInformationHistorial.value.endometriosis === false ? 0 : 1,
      sop: this.formInformationHistorial.value.sop === false ? 0 : 1,
      earlyMenopause: this.formInformationHistorial.value.earlyMenopause === false ? 0 : 1,
      uterineFibroids: this.formInformationHistorial.value.uterineFibroids === false ? 0 : 1,
    })
    .subscribe((res) => {
      this.openSnackBar('Guardado con éxito', 'X');
      return res;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
