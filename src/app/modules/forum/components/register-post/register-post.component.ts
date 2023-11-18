import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PostService } from 'src/app/services/post/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-post',
  templateUrl: './register-post.component.html',
  styleUrls: ['./register-post.component.scss']
})
export class RegisterPostComponent {

  idTopic!: number;

  formPost: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegisterPostComponent>,
    private _snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.idTopic = data.idTopic;
  }
//prueba
  registerPost(): void {
    this.postService.registerPost({
      title: this.formPost.value.title,
      content: this.formPost.value.content,
      createdDate: new Date(),
      userId: this.localStorageService.getUserByLogin()?.idUser,
      topicId: this.idTopic,
    })
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.router.navigate(['/foro/']).then(() => {
              location.reload();
            });
            this.closeDialog()
            // this.openSnackBar('Registro creado', 'OK');
          }
        },
        error: (error) => error,
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
    //this.formCycle.reset();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action);
  }

}
