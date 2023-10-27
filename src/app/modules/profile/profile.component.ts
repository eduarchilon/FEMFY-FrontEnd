import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { UserResponse } from 'src/app/models/user.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { SharedProfileService } from 'src/app/services/profilePicture/profilePicture.service';

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
    private http: HttpClient,
    private storage: Storage,
    private sharedProfileService: SharedProfileService,
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
   this.getProfilePicture();
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

  selectedFile: File | null = null;
  picture: any[] = [];
  
  uploadProfilePicture(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];

      console.log(files[0]);


      if (this.selectedFile) {
        const file = this.selectedFile;
        const idPath = this.localStorageService.getUserByLogin()?.idUser;
        
        const imgRef = ref(this.storage, `profile/${idPath}/${file.name}`);
    
        uploadBytes(imgRef, file).then((snapshot) => {
          
          console.log('Archivo subido con éxito.', snapshot);
        })
        .catch((error) => {
          console.error('Error al subir el archivo:', error);
        });
    
      }
    }
  }


  getProfilePicture(): void {

    const idPath = this.localStorageService.getUserByLogin()?.idUser;

    const profilePath = `profile/${idPath}`;
    const fileRef = ref(this.storage, profilePath);

    listAll(fileRef).then(async (picture : any) => {
      this.picture = [];

      for(let pic of picture?.items){
        const url = await getDownloadURL(pic);
     
        this.picture.push({ url: url });     
        this.sharedProfileService.setUserProfileImage(url);
      }

      console.log(this.picture);
    }).catch((error: any) => {
      console.log(error);
    });

  }

  
}
