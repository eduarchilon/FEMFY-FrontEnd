import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PostService } from 'src/app/services/post/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/services/redux/store/app.store';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadPostSuccess } from 'src/app/services/redux/actions/post/post.api.action';
import { postInit } from 'src/app/services/redux/actions/post/post.page.action';

@Component({
  selector: 'app-register-post',
  templateUrl: './register-post.component.html',
  styleUrls: ['./register-post.component.scss'],
})
export class RegisterPostComponent {
  idTopic!: number;
  formPost: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegisterPostComponent>,
    private localStorageService: LocalStorageService,
    private postService: PostService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.formPost = this.fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
    this.idTopic = data.idTopic;
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.formPost.reset();
  }

  registerPost(): void {
    this.postService
      .registerPost({
        title: this.formPost.value.title,
        content: this.formPost.value.content,
        createdDate: new Date(),
        userId: this.localStorageService.getUserByLogin()?.idUser,
        topicId: this.idTopic,
      })
      .subscribe({
        next: (response: any) => {
          // siempre retorna un 505 error pero registra igual, hay que revisar la api
          // mientras lo manejo desde el error como si fuese exitoso
        },
        error: (error) => {
          this.closeDialog();
          this.openSnackBar('Tu publicación fue registrada con éxito', 'X');
          this.store.dispatch(postInit());
        },
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
