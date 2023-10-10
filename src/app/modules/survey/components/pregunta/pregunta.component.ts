import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from 'src/app/models/user.model';
import { selectUserLogin } from 'src/app/redux/selectors/login.selector';
import { AppState } from 'src/app/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss'],
})
export class PreguntaComponent implements OnInit {
  @Input() preguntas: string[] = [];
  indicePreguntaActual: number = 0;
  userResponse!: UserResponse;
  idRegister!: number;

  formOneRegister: FormGroup = new FormGroup({
    lastTime: new FormControl('', Validators.required),
  });

  formTwoRegister: FormGroup = new FormGroup({
    lastCycleDuration: new FormControl('', Validators.required),
  });

  formThreeRegister: FormGroup = new FormGroup({
    regularCycleDuration: new FormControl('', Validators.required),
  });

  formFourRegister: FormGroup = new FormGroup({
    regular: new FormControl(false, Validators.required),
  });

  formFiveRegister: FormGroup = new FormGroup({
    bleedingDuration: new FormControl('', Validators.required),
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private questionsService: QuestionService,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.store.select(selectUserLogin).subscribe((data: any) => {
      this.userResponse = data?.user;
      if (!this.userResponse) {
        this.userResponse = this.localStorageService.getUserByLogin();
      }
    });
  }

  mostrarSiguientePregunta() {
    if (this.indicePreguntaActual < this.preguntas.length - 1) {
      this.indicePreguntaActual++;
    }
  }

  submitFormOneRegister():void{
    
  }

  submitFormTwoRegister():void{

  }

  submitFormThreeRegister():void{
    
  }

  submitFormFourRegister():void{
    
  }

  submitFormFiveRegister():void{
    
  }

  // registerBasicQuestions(): void {
  //   this.questionsService
  //     .createUserMenstruationQuestion({
  //       userId: 2,
  //       lastTime: this.formRegisterQuestion?.value.lastTime,
  //       lastCycleDuration: this.formRegisterQuestion?.value.lastCycleDuration,
  //       regular:
  //         this.formRegisterQuestion?.value.regular === '1' ? true : false,
  //       regularCycleDuration:
  //         this.formRegisterQuestion?.value.regularCycleDuration,
  //       bleedingDuration: this.formRegisterQuestion?.value.bleedingDuration,
  //     })
  //     .subscribe({
  //       next: (response) => console.log(response),
  //       error: (error) => error,
  //     });
  // }

  redirection(): void {
    this.router.navigate(['']);
  }
}
