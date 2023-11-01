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

  formaumentoDePeso: FormGroup = new FormGroup({
    aumentoDePeso: new FormControl(''),
  });

  formchangesInLibido: FormGroup = new FormGroup({
    changesInLibido: new FormControl(''),
  });

  formchangesInMenstrualCycle: FormGroup = new FormGroup({
    changesInMenstrualCycle: new FormControl(''),
  });

  formchangesInSkinAndHair: FormGroup = new FormGroup({
    changesInSkinAndHair: new FormControl(''),
  });

  formlossOfBoneDensity: FormGroup = new FormGroup({
    lossOfBoneDensity: new FormControl(''),
  });

  formmoodChanges: FormGroup = new FormGroup({
    moodChanges: new FormControl(''),
  });

  formsleepingDifficulties: FormGroup = new FormGroup({
    sleepingDifficulties: new FormControl(''),
  });

  formsuffocation: FormGroup = new FormGroup({
    suffocation: new FormControl(''),
  });

  formvaginalDryness: FormGroup = new FormGroup({
    vaginalDryness: new FormControl(''),
  });

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.questionMenopausica
      .getQuestionMenopausica()
      .subscribe((menopause: QuestionUserMenopause[] | any[]) => {
        this.userMenopauseQustions = menopause?.filter(
          (ques: QuestionUserMenopause) =>
            ques?.userId === this.userResponse.idUser
        )[0];

        this.formaumentoDePeso = this.fb.group({
          aumentoDePeso: [this.userMenopauseQustions?.aumentoDePeso],
        });

        this.formchangesInLibido = this.fb.group({
          changesInLibido: [this.userMenopauseQustions?.changesInLibido],
        });

        this.formchangesInMenstrualCycle = this.fb.group({
          changesInMenstrualCycle: [
            this.userMenopauseQustions?.changesInMenstrualCycle,
          ],
        });

        this.formchangesInSkinAndHair = this.fb.group({
          changesInSkinAndHair: [
            this.userMenopauseQustions?.changesInSkinAndHair,
          ],
        });

        this.formlossOfBoneDensity = this.fb.group({
          lossOfBoneDensity: [this.userMenopauseQustions?.lossOfBoneDensity],
        });

        this.formmoodChanges = this.fb.group({
          moodChanges: [this.userMenopauseQustions?.moodChanges],
        });

        this.formsleepingDifficulties = this.fb.group({
          sleepingDifficulties: [
            this.userMenopauseQustions?.sleepingDifficulties,
          ],
        });

        this.formsuffocation = this.fb.group({
          suffocation: [this.userMenopauseQustions?.suffocation],
        });

        this.formvaginalDryness = this.fb.group({
          vaginalDryness: [this.userMenopauseQustions?.vaginalDryness],
        });
      });
  }

  submit1(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        aumentoDePeso:
          this.formaumentoDePeso.value.aumentoDePeso === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit2(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        changesInLibido:
          this.formchangesInLibido.value.changesInLibido === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit3(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        changesInMenstrualCycle:
          this.formchangesInMenstrualCycle.value.changesInMenstrualCycle ===
          false
            ? 0
            : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit4(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        changesInSkinAndHair:
          this.formchangesInSkinAndHair.value.changesInSkinAndHair === false
            ? 0
            : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit5(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        lossOfBoneDensity:
          this.formlossOfBoneDensity.value.lossOfBoneDensity === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit6(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        moodChanges: this.formmoodChanges.value.moodChanges === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit7(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        sleepingDifficulties:
          this.formsleepingDifficulties.value.sleepingDifficulties === false
            ? 0
            : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit8(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        suffocation: this.formsuffocation.value.suffocation === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X');
        return res;
      });
  }

  submit9(): void {
    this.questionMenopausica
      .updateUserMenopauseQuestion({
        ...this.userMenopauseQustions,
        vaginalDryness:
          this.formvaginalDryness.value.vaginalDryness === false ? 0 : 1,
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
