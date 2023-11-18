import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-otro',
  templateUrl: './question-otro.component.html',
  styleUrls: ['./question-otro.component.scss'],
})
export class QuestionOtroComponent implements OnInit {
  questionOtherType!: number;

  constructor() {}
  ngOnInit(): void {}

  selectOther(value: string | number): void {
    switch (value) {
      case '1':
        this.questionOtherType = 1;
        console.log(value);
        break;
      case '2':
        this.questionOtherType = 2;
        console.log(value);
        break;
      default:
        break;
    }
  }
}
