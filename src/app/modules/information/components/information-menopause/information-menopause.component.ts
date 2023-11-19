import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionUserMenopause } from 'src/app/models/question.model';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionMenopausicaService } from 'src/app/services/question-menopausica/question-menopausica.service';

@Component({
  selector: 'app-information-menopause',
  templateUrl: './information-menopause.component.html',
  styleUrls: ['./information-menopause.component.scss'],
})
export class InformationMenopauseComponent implements OnInit {
  userResponse!: UserResponse;
  userMenopauseQustions: QuestionUserMenopause = {};

  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private questionMenopausica: QuestionMenopausicaService
  ) {}

  formInformationMenopause: FormGroup = new FormGroup({
    aumentoDePeso: new FormControl(''),
    changesInLibido: new FormControl(''),
    changesInMenstrualCycle: new FormControl(''),
    changesInSkinAndHair: new FormControl(''),
    lossOfBoneDensity: new FormControl(''),
    moodChanges: new FormControl(''),
    sleepingDifficulties: new FormControl(''),
    suffocation: new FormControl(''),
    vaginalDryness: new FormControl(''),
  })

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.questionMenopausica
      .getQuestionUserMenopauseByIdUser(this.userResponse?.idUser)
      .subscribe((menopauseQuestions: QuestionUserMenopause[] | any[]) => {
        this.userMenopauseQustions = menopauseQuestions[0];

        this.formInformationMenopause = this.fb.group({
          aumentoDePeso: [this.userMenopauseQustions?.aumentoDePeso],
          changesInLibido: [this.userMenopauseQustions?.changesInLibido],
          changesInMenstrualCycle: [this.userMenopauseQustions?.changesInMenstrualCycle],
          changesInSkinAndHair: [this.userMenopauseQustions?.changesInSkinAndHair],
          lossOfBoneDensity: [this.userMenopauseQustions?.lossOfBoneDensity],
          moodChanges: [this.userMenopauseQustions?.moodChanges],
          sleepingDifficulties: [this.userMenopauseQustions?.sleepingDifficulties],
          suffocation: [this.userMenopauseQustions?.suffocation],
          vaginalDryness: [this.userMenopauseQustions?.vaginalDryness],
        });
        console.log(this.userMenopauseQustions)
      });
  }

  submitInformationMenopause(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        aumentoDePeso: this.formInformationMenopause.value.aumentoDePeso === false ? 0 : 1,
        changesInLibido: this.formInformationMenopause.value.changesInLibido === false ? 0 : 1,
        changesInMenstrualCycle: this.formInformationMenopause.value.changesInMenstrualCycle === false ? 0 : 1,
        changesInSkinAndHair: this.formInformationMenopause.value.changesInSkinAndHair === false ? 0 : 1,
        lossOfBoneDensity: this.formInformationMenopause.value.lossOfBoneDensity === false ? 0 : 1,
        moodChanges: this.formInformationMenopause.value.moodChanges === false ? 0 : 1,
        sleepingDifficulties: this.formInformationMenopause.value.sleepingDifficulties === false ? 0 : 1,
        suffocation: this.formInformationMenopause.value.suffocation === false ? 0 : 1,
        vaginalDryness: this.formInformationMenopause.value.vaginalDryness === false ? 0 : 1,
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
