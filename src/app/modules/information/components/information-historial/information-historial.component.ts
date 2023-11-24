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
  });

  convertValueToInteger(value: number | boolean): number {
    let newValue = 0;
    if (value === 1 || value === true) {
      newValue = 1;
    } else {
      newValue = 0;
    }
    return newValue;
  }

  submitInformationHistorial(): void {
    console.log(this.formInformationHistorial.value);
    let formResult: QuestionsUserFamilyHistory = {
      id: this.userHistorial?.id,
      userId: this.userHistorial?.userId,
      breastCancer: this.convertValueToInteger(
        this.formInformationHistorial.value.breastCancer
      ),
      ovarianCancer: this.convertValueToInteger(
        this.formInformationHistorial.value.ovarianCancer
      ),
      endometriosis: this.convertValueToInteger(
        this.formInformationHistorial.value.endometriosis
      ),
      sop: this.convertValueToInteger(this.formInformationHistorial.value.sop),
      earlyMenopause: this.convertValueToInteger(
        this.formInformationHistorial.value.earlyMenopause
      ),
      uterineFibroids: this.convertValueToInteger(
        this.formInformationHistorial.value.uterineFibroids
      ),
    };
    this.historyService
      .updateUserHistoryQuestion(formResult)
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        console.log(res);
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
