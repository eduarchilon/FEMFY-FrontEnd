import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsUserFamilyHistory } from 'src/app/models/historial.model';
import { QuestionUserCongenital, QuestionUserHormonal } from 'src/app/models/question.model';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionCongenitalService } from 'src/app/services/question-congenital/question-congenital.service';
import { QuestionHormonalService } from 'src/app/services/question-hormonal/question-hormonal.service';

@Component({
  selector: 'app-information-hormonal',
  templateUrl: './information-hormonal.component.html',
  styleUrls: ['./information-hormonal.component.scss']
})
export class InformationHormonalComponent implements OnInit {
  userResponse!: UserResponse;
  userQuestions: QuestionUserHormonal = {};

  constructor(
    private questionHormonalService: QuestionHormonalService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.questionHormonalService
      .getQuestionUserHormonalByIdUser(this.userResponse?.idUser)
      .subscribe((history: QuestionsUserFamilyHistory | any) => {
        this.userQuestions = history[0];
        this.formInformationHormonal = this.fb.group({
          hyperprolactinemia: [this.userQuestions.hyperprolactinemia],
          hypothalamicDisorders: [this.userQuestions.hypothalamicDisorders],
          hypothyroidism: [this.userQuestions.hypothyroidism],
          insulinResistance: [this.userQuestions.insulinResistance],
          polycysticOvarySyndrome: [this.userQuestions.polycysticOvarySyndrome],
          prematureOvarianFailure: [this.userQuestions.prematureOvarianFailure],
          sheehanSyndrome: [this.userQuestions.sheehanSyndrome]
        });
      });
  }

  formInformationHormonal: FormGroup = new FormGroup({
    malformationsUterine: new FormControl(''),
    turnerSyndrome: new FormControl(''),
  })

  submitInformationHormonal(): void {
    this.questionHormonalService
    .updateUserHormonalQuestion({
      ...this.userQuestions,
      hyperprolactinemia: this.formInformationHormonal.value.hyperprolactinemia === false ? 0 : 1,
      hypothalamicDisorders: this.formInformationHormonal.value.hypothalamicDisorders === false ? 0 : 1,
      hypothyroidism: this.formInformationHormonal.value.hypothyroidism === false ? 0 : 1,
      insulinResistance: this.formInformationHormonal.value.insulinResistance === false ? 0 : 1,
      polycysticOvarySyndrome: this.formInformationHormonal.value.polycysticOvarySyndrome === false ? 0 : 1,
      prematureOvarianFailure: this.formInformationHormonal.value.prematureOvarianFailure === false ? 0 : 1,
      sheehanSyndrome: this.formInformationHormonal.value.sheehanSyndrome === false ? 0 : 1
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
