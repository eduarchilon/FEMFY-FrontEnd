import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WhatsAppMessage } from 'src/app/models/whats-app-message.model';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppService {
  constructor(private httpClient: HttpClient) {}

  apiUrl: string = 'https://whats-app-api-production.up.railway.app/lead';

  sendWhatsaAppMessage(event: WhatsAppMessage): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, event);
  }

  apiNotification: boolean = false;

  getWhatsAppApiNotification(): boolean {
    return this.apiNotification;
  }

  setWhatsAppApiNotification(value: boolean): void {
    this.apiNotification = value;
  }
}
