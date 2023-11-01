import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getMetadata,
} from '@angular/fire/storage';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
  typeStudies = [
    { id: 1, name: 'Colposcopia' },
    { id: 2, name: 'Papanicolaou' },
    { id: 3, name: 'Citología' },
    { id: 4, name: 'Ecografía vaginal' },
    { id: 5, name: 'Histeroscopía' },
    { id: 6, name: 'Mamografía' },
    { id: 7, name: 'Ecografía mamaria' },
    { id: 8, name: 'Densitometría ósea' },
    { id: 9, name: 'Analítica de sangre' },
  ];

  @ViewChild('fileLabel', { static: true }) fileLabel!: ElementRef;

  formDocumentation: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required),
    idUser: new FormControl('', Validators.required),
    studyDate: new FormControl('', Validators.required),
    typeStudy: new FormControl('', Validators.required),
  });

  selectedFile: File | null = null;

  fileBase64: string = '';
  loader: boolean = false;

  constructor(
    private documentationService: DocumentationService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private storage: Storage,
    private loaderService: LoaderService
  ) {
    this.formDocumentation = this.fb.group({
      description: ['', Validators.required],
      fileBase64: [''], // Este campo lo llenarás cuando se cargue un archivo
      fileExt: [''], // Este campo lo llenarás cuando se cargue un archivo
      fileName: ['', Validators.required],
      idUser: ['', Validators.required],
      studyDate: ['', Validators.required],
      typeStudy: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getFiles();
  }

  fileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];

      console.log(files[0]);

      this.fileLabel.nativeElement.textContent = this.selectedFile.name;
    }
  }

  uploadFile() {
    this.loaderService.showLoader();
    if (this.selectedFile) {
      const file = this.selectedFile;

      const imgRef = ref(
        this.storage,
        `${this.localStorageService.getUserByLogin()?.idUser}/${file.name}`
      );

      this.fileLabel.nativeElement.textContent = file.name;

      const metadata = {
        description: this.formDocumentation.get('description')?.value,
        studyDate: this.formDocumentation.get('studyDate')?.value,
        typeStudy: this.formDocumentation.get('typeStudy')?.value,
      };
      uploadBytes(imgRef, file, { customMetadata: metadata })
        .then((snapshot) => {
          console.log('Archivo subido con éxito.', snapshot);
          this.loaderService.showLoader();
          this.getFiles();
          this.loaderService.hideLoader();
        })
        .catch((error) => {
          console.error('Error al subir el archivo:', error);
        });
      this.loaderService.hideLoader();
      this.formDocumentation.reset();
    }
    this.loaderService.hideLoader();
    this.formDocumentation.reset();
    this.getFiles();
  }

  /* uploadFile(): void {

    if (this.selectedFile) {
      const formData = new FormData();
      
      formData.append('fileBase64', this.fileBase64);
      formData.append('fileExt', this.getFileExtension(this.selectedFile.name));
      formData.append('description', this.formDocumentation.get('description')?.value);
      formData.append('fileName', this.selectedFile.name);
      formData.append('idUser', JSON.stringify(this.localStorageService.getUserByLogin()?.idUser));
      formData.append('studyDate', this.formDocumentation.get('studyDate')?.value);
  
      formData.append('typeStudy', this.formDocumentation.get('typeStudy')?.value);

      console.log(this.fileBase64);
      console.log(this.getFileExtension(this.selectedFile.name));
      console.log(this.formDocumentation.get('description')?.value);
      console.log(this.selectedFile.name);
      console.log(JSON.stringify(this.localStorageService.getUserByLogin()?.idUser));
      console.log(this.formDocumentation.get('studyDate')?.value);
      console.log(JSON.stringify(this.formDocumentation.get('typeStudy')?.value));

      
      this.documentationService.uploadFile(formData).subscribe(
        (response) => {
          console.log('Datos enviados con éxito', response);
        },
        (error) => {
          console.error('Error al enviar datos', error);
        });
     }
  } */

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

  studies: any[] = [];

  getFiles(): void {
    this.loader = true;
    const idUser = JSON.stringify(
      this.localStorageService.getUserByLogin()?.idUser
    );
    const fileRef = ref(this.storage, idUser);

    listAll(fileRef)
      .then(async (idUser: any) => {
        this.studies = [];

        for (let files of idUser?.items) {
          const meta = (await getMetadata(files)).customMetadata;
          const url = await getDownloadURL(files);

          this.studies.push({ url: url, files: files, customMetadata: meta });
       }

       this.studies.forEach((estudio) => {
        estudio.customMetadata.studyDate = this.formatDate(estudio.customMetadata.studyDate);
      });

        this.loader = false;

        /* this.studies = this.studies?.filter(
        (data: any) => data?.customMetadata?.typeStudy === 'uno'
      );*/
        console.log(this.studies);
        console.log(this.studies[0].customMetadata.studyDate);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }


  formatDate(originalDate: any) {
    const date = new Date(originalDate);

    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
  
    return `${dia}-${mes}-${anio}`;
  }


  deleteFile(fullPath: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
      /*const storageRef = firebase.storage().ref();
      //const fileRef = storageRef.child(fullPath);

      fileRef.delete()
       .then(() => {
          console.log('Archivo eliminado correctamente');
          // Puedes realizar otras acciones aquí
        })
        .catch(() => {
          console.error('Error al eliminar el archivo:');
        });*/
    }
  }
}
