import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Esto asegura que el servicio sea un servicio global
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