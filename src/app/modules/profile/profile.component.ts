import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { UserResponse } from 'src/app/models/user.model';
import { AppState } from 'src/app/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editProfile: boolean = false;

  userResponse!: UserResponse;
  userStorage!: UserResponse;

  profileForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin()
    this.profileForm = this.fb.group({
      firstName: [this.userResponse.firstName],
      lastName: [this.userResponse.lastName],
      birthdate: [this.userResponse.birthdate],
      email: [this.userResponse.email],
      phone: [this.userResponse.phone]
    });
  }

  enableEditMode() {
    this.editProfile = true;
  }

  disableEditMode() {
    this.editProfile = false;
  }

  apiUrl: string = 'http://localhost:8090/api/v1/user/updateUser';

  updateProfile() {
    const updatedUserData = this.profileForm.value;
    const idUser = this.userResponse.idUser;

    this.http.post(this.apiUrl, {
      ...updatedUserData,
      idUser: idUser
    }).subscribe(
      (data: any) => console.log(data)
    )
  }

  
}
