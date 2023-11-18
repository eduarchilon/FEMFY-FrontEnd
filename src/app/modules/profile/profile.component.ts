import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from 'src/app/models/user.model';
import { AppState } from 'src/app/services/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from '@angular/fire/storage';
import { SharedProfileService } from 'src/app/services/profilePicture/profilePicture.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  editProfile: boolean = false;

  userResponse!: UserResponse;
  userStorage!: UserResponse;

  profileForm!: FormGroup;

  options = ['Menstruante', 'No menstruante', 'Menopáusica'];
  selectedOption: string = 'Menstruante';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private http: HttpClient,
    private storage: Storage,
    private sharedProfileService: SharedProfileService,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();

    console.log(this.localStorageService.getUserByLogin());

    this.profileForm = this.fb.group({
      firstName: [this.userResponse.firstName],
      lastName: [this.userResponse.lastName],
      birthdate: [this.userResponse.birthdate],
      phone: [this.userResponse.phone],
      email: [this.userResponse.email],
      typeUserID: [this.userResponse.typeUserID],
      idUser: [this.localStorageService.getUserByLogin()?.idUser]
    });
    this.getProfilePicture();
  }

  enableEditMode() {
    this.editProfile = true;
  }

  disableEditMode() {
    this.editProfile = false;
  }

  apiUrl: string = 'https://femfy-api.up.railway.app/api/v1/user/updateUser';
  usersUrl: string = environment.apiUrlLocal + '/user';

  updateProfile() {
    if (this.profileForm.valid) {
      const updatedUserData = this.profileForm.value;

      const userData = {    
        ...updatedUserData,
        typeUserID: this.localStorageService.getUserByLogin()?.typeUserID,
        userName: this.localStorageService.getUserByLogin()?.userName,
      };

      

      console.log(userData);

      // Utiliza una solicitud PUT para actualizar el perfil
      this.http.put(`${this.apiUrl}`, updatedUserData).subscribe({
        next: (data: any) => {

          const keys = [];
          const values = [];

          keys.push('firstName');
          values.push(updatedUserData.firstName);
        
          keys.push('lastName');
          values.push(updatedUserData.lastName);

          keys.push('birthdate');
          values.push(updatedUserData.birthdate);

          keys.push('phone');
          values.push(updatedUserData.phone);

          keys.push('typeUserID');
          values.push(updatedUserData.typeUserID);

          this.localStorageService.setKeysAndValuesLocalStorage(keys, values);

          this.snackBar.open('Datos actualizados con éxito.', 'cerrar', {
            duration: 5000, // Duración en milisegundos
          });

          location.reload();

        },
        error: (error: any) => {
          this.snackBar.open('Error al actualizar los datos.', 'cerrar', {
            duration: 5000, // Duración en milisegundos
          });
        },
      });
    }
  }

  // Picture profile config --------

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

        uploadBytes(imgRef, file)
          .then((snapshot) => {
            console.log('Archivo subido con éxito.', snapshot);
            this.snackBar.open('Foto subida correctamente', 'cerrar', {
              duration: 5000, // Duración en milisegundos
            });
            window.location.reload();
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

    listAll(fileRef)
      .then(async (picture: any) => {
        this.picture = [];

        for (let pic of picture?.items) {
          const url = await getDownloadURL(pic);

          this.picture.push({ url: url });
          this.sharedProfileService.setUserProfileImage(url);
        }

        console.log(this.picture);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
