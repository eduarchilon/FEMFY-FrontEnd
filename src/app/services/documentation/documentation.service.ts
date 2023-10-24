import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class DocumentationService {

  usersUrl: string = environment.apiUrlLocal + '/user';

  constructor(
    private http: HttpClient,
    ) { }


    uploadFile(fileData: FormData): Observable<any> {
      return this.http.post(`${this.usersUrl}/uploadFile`, fileData);
    }
  
    deleteFile(fileId: string): Observable<any> {
      return this.http.delete(`${this.usersUrl}/deleteFile/${fileId}`);
    }
  
    updateFile(fileId: string, fileData: FormData): Observable<any> {
      return this.http.put(`${this.usersUrl}/updateFile/${fileId}`, fileData);
    }

    downloadFile(fileId: string): Observable<any> {
      return this.http.get(`${this.usersUrl}/downloadFile/${fileId}`, { responseType: 'blob' });
    }

}