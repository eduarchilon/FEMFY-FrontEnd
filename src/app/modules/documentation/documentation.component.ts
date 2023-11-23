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
  deleteObject,
} from '@angular/fire/storage';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { QRGeneratorComponent } from './QRGenerator/QRGenerator.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    { id: 4, name: 'Ecografía transvaginal' },
    { id: 5, name: 'Histeroscopía' },
    { id: 6, name: 'Mamografía' },
    { id: 7, name: 'Ecografía mamaria' },
    { id: 8, name: 'Densitometría ósea' },
    { id: 9, name: 'Analítica de sangre' },
    { id: 10, name: 'Otro' },
  ];

  @ViewChild('fileLabel', { static: true }) fileLabel!: ElementRef;

  formDocumentation: FormGroup;

  selectedFile: File | null = null;

  loader: boolean = false;

  userId!: number | any;
  isCompartir!: boolean;

  constructor(
    private documentationService: DocumentationService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private storage: Storage,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.formDocumentation = this.fb.group({
      description: ['', Validators.required],
      fileExt: [''], // Este campo lo llenarás cuando se cargue un archivo
      fileName: ['', Validators.required],
      idUser: ['', Validators.required],
      studyDate: ['', Validators.required],
      typeStudy: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.userId = this.localStorageService.getUserByLogin()?.idUser;
    const isSuscriptor =
      this.localStorageService.getUserByLogin()?.isSuscriptor;
    if (isSuscriptor === 0 || isSuscriptor === true  || isSuscriptor !== null) {
      this.isCompartir = true;
    }

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

    // Carga del archivo en FireBase
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


      const formData = {
        fileExt: this.getFileExtension(this.selectedFile.name),
        description: this.formDocumentation.get('description')?.value,
        fileName: this.selectedFile.name,
        idUser: this.localStorageService.getUserByLogin()?.idUser,
        studyDate: this.formDocumentation.get('studyDate')?.value,
        typeStudy: {
          idTypeStudy: this.findTypeIdByName(this.formDocumentation.get('typeStudy')?.value),
          description: this.formDocumentation.get('typeStudy')?.value
        }
      };

      console.log(formData);

      this.documentationService.uploadFile(formData).subscribe(
        (response) => {
          console.log('Datos enviados con éxito', response);
        },
        (error) => {
          console.error('Error al enviar datos', error);
        });


      uploadBytes(imgRef, file, { customMetadata: metadata })
        .then((snapshot) => {

          this._snackBar.open('Estudio subido con éxito.', 'cerrar', {
            duration: 5000, // Duración en milisegundos
          })

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


  findTypeIdByName(name: string): number | null {
    const study = this.typeStudies.find((type) => type.name === name);

    // Si se encuentra un tipo con ese nombre, devuelve su id; de lo contrario, devuelve null.
    return study ? study.id : null;
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


  async deleteFile(studyFile: any): Promise<void> {
    const isConfirmed = window.confirm('¿Estás seguro de eliminar este archivo?');

    if (!isConfirmed) {
      return;
    }


    try {
      const idUser = this.localStorageService.getUserByLogin()?.idUser;
      const filePath = `${idUser}/${studyFile.name}`;
      const fileRef = ref(this.storage, filePath);

      // Eliminar el archivo
      await deleteObject(fileRef);

      // Actualizar la lista de archivos después de eliminar
      await this.getFiles();

      this._snackBar.open('Estudio eliminado correctamente.', 'X', {
        duration: 5000, // Duración en milisegundos
      })
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  }

  refreshPage() {
    location.reload();
  }


  viewQR(fileURL: string, typeStudy: string): void {
    this.dialog.open(QRGeneratorComponent, {
      panelClass: ['!rounded-[20px]'],
      data: {
        fileURL,
        typeStudy,
      },
    });
  }


}
