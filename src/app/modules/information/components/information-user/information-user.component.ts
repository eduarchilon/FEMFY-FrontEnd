import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionUserMenstruation } from 'src/app/models/question.model';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-information-user',
  templateUrl: './information-user.component.html',
  styleUrls: ['./information-user.component.scss'],
})
export class InformationUserComponent implements OnInit {
  userResponse!: UserResponse;
  userQuestions: QuestionUserMenstruation = {};

  defaultDate!: string;
  constructor(
    private questionService: QuestionService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.questionService
      .getQuestionUserMenstruationByIdUser(this.userResponse?.idUser)
      .subscribe((questions: QuestionUserMenstruation | any) => {
        this.userQuestions = questions[0];
        this.defaultDate = this.userQuestions.lastTime;

        this.formInformationMenstruation = this.fb.group({
          lastTime: [this.userQuestions.lastTime],
          lastCycleDuration: [this.userQuestions.lastCycleDuration],
          regular: [this.userQuestions.regular],
          regularCycleDuration: [this.userQuestions.regularCycleDuration],
          bleedingDuration: [this.userQuestions.bleedingDuration],
        });
      });
  }

  formInformationMenstruation: FormGroup = new FormGroup({
    lastime: new FormControl(''),
    lastCycleDuration: new FormControl(''),
    regular: new FormControl(''),
    regularCycleDuration: new FormControl(''),
    bleedingDuration: new FormControl(''),
  });

  submitInformationMenstruation(): void {
    this.questionService
      .updateUserMenstruationQuestion({
        ...this.userQuestions,
        lastTime: this.formInformationMenstruation.value.lastime,
        lastCycleDuration:
          this.formInformationMenstruation.value.lastCycleDuration,
        regular:
          this.formInformationMenstruation.value.regular === false
            ? false
            : true,
        regularCycleDuration:
          this.formInformationMenstruation.value.regularCycleDuration,
        bleedingDuration:
          this.formInformationMenstruation.value.bleedingDuration,
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
