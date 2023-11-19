import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  _isShowLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isShow: boolean = false;

  get loaderStatus(): Observable<any> {
    return this._isShowLoader;
  }

  showLoader(): void {
    this._isShowLoader.next(true);
  }

  hideLoader(): void {
    this._isShowLoader.next(false);
  }
}
