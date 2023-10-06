import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  studyTypes: string[] = [
    "Ginecológico",
    "Obstetra",
  ];

  
  selectedStudyType: string | null = null;
}
