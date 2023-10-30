import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class SharedProfileService {
  private userProfileImage: string = '';

  setUserProfileImage(imageUrl: string) {
    this.userProfileImage = imageUrl;
  }

  getUserProfileImage() {
    return this.userProfileImage;
  }
}