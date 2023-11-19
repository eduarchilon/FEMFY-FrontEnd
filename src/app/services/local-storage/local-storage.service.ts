import { Injectable } from '@angular/core';
import { constants } from 'src/app/constans/constants';
import { UserDataCycle, UserResponse } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getLocalStorage(key: string): string | any {
    return localStorage.getItem(key);
  }

  deleteValue(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }

  parseLocalStorage(key: string): any {
    return JSON.parse(this.getLocalStorage(key));
  }

  getUserByLogin(): UserResponse {
    return this.parseLocalStorage(constants.USER);
  }

  getUserDataCycle(): UserDataCycle {
    return this.parseLocalStorage(constants.USERCYCLE);
  }

  setKeysAndValuesLocalStorage(key: string[], value: string[]): void {
    if (key && value) {
      localStorage.clear();
      for (let i = 0; i < key.length; i++) {
        localStorage.setItem(key[i], JSON.stringify(value[i]));
      }
    }
  }

  setKeyValueLocalStorage(key: string, value: string): void {
    if (key && value) {
      localStorage.setItem(key, value);
    }
  }
}
