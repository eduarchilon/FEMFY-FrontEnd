import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PostService } from 'src/app/services/post/post.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-post',
  templateUrl: './register-post.component.html',
  styleUrls: ['./register-post.component.scss']
})
export class RegisterPostComponent {

  idTopic!: number;
  formPost: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.formPost = this.fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
    this.idTopic = data.idTopic;
  }

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
            this.router.navigate(['/foro/' + this.idTopic]).then(() => {
              location.reload();
            });
          }
        },
        error: (error) => error,
      });
  }

}
