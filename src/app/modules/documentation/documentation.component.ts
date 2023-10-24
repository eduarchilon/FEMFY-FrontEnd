import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})

export class DocumentationComponent implements OnInit {

  formDocumentation: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required),
    idUser: new FormControl('', Validators.required),
    studyDate: new FormControl('', Validators.required),
    typeStudy: new FormControl('', Validators.required)

  });

  selectedFile: File | null = null;

  fileBase64: string = '';

  constructor(
    private authService: AuthService,
    private documentationService: DocumentationService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
    ) { 

      this.formDocumentation = this.fb.group({
        description: ['', Validators.required],
        fileBase64: [''], // Este campo lo llenarás cuando se cargue un archivo
        fileExt: [''], // Este campo lo llenarás cuando se cargue un archivo
        fileName: ['', Validators.required],
        idUser: ['', Validators.required],
        studyDate: ['', Validators.required],
        typeStudy: ['', Validators.required]
      });


    }

  ngOnInit(): void {
    
  }

  fileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];

      console.log(files[0]);

      this.convertFileToBase64(this.selectedFile);
    }
  }

  uploadFile(): void {

    if (this.selectedFile) {
      const formData = new FormData();
      
      formData.append('fileBase64', this.fileBase64);
      formData.append('fileExt', this.getFileExtension(this.selectedFile.name));
      formData.append('description', this.formDocumentation.get('description')?.value);
      formData.append('fileName', this.selectedFile.name);
      formData.append('idUser', JSON.stringify(this.localStorageService.getUserByLogin()?.idUser));
      formData.append('studyDate', this.formDocumentation.get('studyDate')?.value);
  
      formData.append('typeStudy', this.formDocumentation.get('typeStudy')?.value);

      /*console.log(this.fileBase64);
      console.log(this.getFileExtension(this.selectedFile.name));
      console.log(this.formDocumentation.get('description')?.value);
      console.log(this.selectedFile.name);
      console.log(JSON.stringify(this.localStorageService.getUserByLogin()?.idUser));
      console.log(this.formDocumentation.get('studyDate')?.value);
      console.log(JSON.stringify(this.formDocumentation.get('typeStudy')?.value));*/

      
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
      console.log('Archivo convertido a base64:', this.fileBase64);
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
