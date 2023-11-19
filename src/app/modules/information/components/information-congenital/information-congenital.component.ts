import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsUserFamilyHistory } from 'src/app/models/historial.model';
import { QuestionUserCongenital } from 'src/app/models/question.model';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionCongenitalService } from 'src/app/services/question-congenital/question-congenital.service';

@Component({
  selector: 'app-information-congenital',
  templateUrl: './information-congenital.component.html',
  styleUrls: ['./information-congenital.component.scss']
})
export class InformationCongenitalComponent implements OnInit {
  userResponse!: UserResponse;
  userQuestions: QuestionUserCongenital = {};

  constructor(
    private questionCongenitalService: QuestionCongenitalService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.questionCongenitalService
      .getQuestionUserCongenitalByIdUser(this.userResponse?.idUser)
      .subscribe((history: QuestionUserCongenital | any) => {
        this.userQuestions = history[0];
        this.formInformationCongenital = this.fb.group({
          malformationsUterine: [this.userQuestions.malformationsUterine],
          turnerSyndrome: [this.userQuestions.turnerSyndrome],
        });
      });
  }

  formInformationCongenital: FormGroup = new FormGroup({
    malformationsUterine: new FormControl(''),
    turnerSyndrome: new FormControl(''),
  })

  submitInformationCongenital(): void {
    this.questionCongenitalService
    .updateUserCongenitalQuestion({
      ...this.userQuestions,
      malformationsUterine: this.formInformationCongenital.value.malformationsUterine === false ? 0 : 1,
      turnerSyndrome: this.formInformationCongenital.value.turnerSyndrome === false ? 0 : 1,
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
