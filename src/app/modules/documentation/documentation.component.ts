import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})

export class DocumentationComponent implements OnInit {

  formDocumentation: FormGroup = new FormGroup({
    fileBase64: new FormControl('', Validators.required),
    fileExt: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required),
    idFile: new FormControl('', Validators.required),
    idUser: new FormControl(this.authService.getUserId(), Validators.required),
  });

  selectedFile: File | null = null;

  fileBase64: string = '';

  constructor(
    private authService: AuthService,
    private documentationService: DocumentationService
    ) { }

  ngOnInit(): void {
    
  }

  fileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];
      this.convertFileToBase64(this.selectedFile);
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('fileBase64', this.formDocumentation.get('fileBase64')?.value);
      formData.append('fileExt', this.formDocumentation.get('fileExt')?.value);
      formData.append('fileName', this.formDocumentation.get('fileName')?.value);
      formData.append('idFile', this.formDocumentation.get('idFile')?.value);
      formData.append('idUser', this.formDocumentation.get('idUser')?.value);


      this.documentationService.uploadFile(formData).subscribe(
        (response) => {
          console.log('Datos enviados con éxito', response);
        },
        (error) => {
          console.error('Error al enviar datos', error);
        });
     }
  }
  
  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.fileBase64 = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }


  //DELETE Y DOWNLOAD NO CONFIGURADOS

  deleteFile(fileId: string): void {
    this.documentationService.deleteFile(fileId).subscribe(
      (response) => {
        console.log('Archivo eliminado con éxito', response);
      },
      (error) => {
        console.error('Error al eliminar archivo', error);
      });
  }

  downloadFile(fileId: string): void {
    this.documentationService.downloadFile(fileId).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.formDocumentation.get('fileName')?.value; // Establece el nombre de archivo para la descarga
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar archivo', error);
      });
  }

}
