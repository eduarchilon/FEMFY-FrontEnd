import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-question-otro',
  templateUrl: './question-otro.component.html',
  styleUrls: ['./question-otro.component.scss'],
})
export class QuestionOtroComponent implements OnInit {
  questionOtherType!: number;
  userResponse!: UserResponse;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
  }

  selectOther(value: string | number): void {
    switch (value) {
      case '3':
        this.questionOtherType = 3;
        this.authService
          .updateUser({ ...this.userResponse, typeUserID: 3 })
          .subscribe({
            next: (res: any) => {
              return res;
            },
            error: (err: any) => err,
          });
        break;
      case '4':
        this.questionOtherType = 4;
        this.authService
          .updateUser({ ...this.userResponse, typeUserID: 4 })
          .subscribe({
            next: (res: any) => {
              return res;
            },
            error: (err: any) => err,
          });
        console.log(value);
        break;
      default:
        break;
    }
  }
}
