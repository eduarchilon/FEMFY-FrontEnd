import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsUserFamilyHistory } from 'src/app/models/historial.model';
import { UserResponse } from 'src/app/models/user.model';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-information-historial',
  templateUrl: './information-historial.component.html',
  styleUrls: ['./information-historial.component.scss'],
})
export class InformationHistorialComponent implements OnInit {
  userResponse!: UserResponse;
  userHistorial: QuestionsUserFamilyHistory = {};

  constructor(
    private historyService: HistorialService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userResponse = this.localStorageService.getUserByLogin();
    this.historyService
      .getQuestionUserHistoryByIdHistory(this.userResponse?.idHistorial)
      .subscribe((history: QuestionsUserFamilyHistory | any) => {
        this.userHistorial = history;
        this.formPreguntasCancerMamar = this.fb.group({
          breastCancer: [this.userHistorial.breastCancer],
        });

        this.formPreguntasCancerOvario = this.fb.group({
          ovarianCancer: [this.userHistorial.ovarianCancer],
        });

        this.formPreguntasEndometriosis = this.fb.group({
          endometriosis: [this.userHistorial.endometriosis],
        });

        this.formPreguntasOvarioPoliquistico = this.fb.group({
          sop: [this.userHistorial.sop],
        });

        this.formPreguntasMenopausiaTemprana = this.fb.group({
          earlyMenopause: [this.userHistorial.earlyMenopause],
        });

        this.formPreguntasMioma = this.fb.group({
          uterineFibroids: [this.userHistorial.uterineFibroids],
        });
      });
  }

  formPreguntasCancerMamar: FormGroup = new FormGroup({
    breastCancer: new FormControl(''),
  });

  formPreguntasCancerOvario: FormGroup = new FormGroup({
    ovarianCancer: new FormControl(''),
  });

  formPreguntasEndometriosis: FormGroup = new FormGroup({
    endometriosis: new FormControl(''),
  });

  formPreguntasOvarioPoliquistico: FormGroup = new FormGroup({
    sop: new FormControl(''),
  });

  formPreguntasMenopausiaTemprana: FormGroup = new FormGroup({
    earlyMenopause: new FormControl(''),
  });

  formPreguntasMioma: FormGroup = new FormGroup({
    uterineFibroids: new FormControl(''),
  });

  submitBreastCancer(): void {
    this.historyService
      .updateUserHistoryQuestion({
        ...this.userHistorial,
        breastCancer:
          this.formPreguntasCancerMamar.value.breastCancer === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X')
        return res;
      });
  }

  submitOvarianCancer(): void {
    this.historyService
      .updateUserHistoryQuestion({
        ...this.userHistorial,
        ovarianCancer:
          this.formPreguntasCancerOvario.value.ovarianCancer === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X')
        return res;
      });
  }

  submitEndometriosis(): void {
    this.historyService
      .updateUserHistoryQuestion({
        ...this.userHistorial,
        endometriosis:
          this.formPreguntasEndometriosis.value.endometriosis === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X')
        return res;
      });
  }

  submitSop(): void {
    this.historyService
      .updateUserHistoryQuestion({
        ...this.userHistorial,
        sop:
          this.formPreguntasOvarioPoliquistico.value.sop === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X')
        return res;
      });
  }

  submitEarlyMenopause(): void {
    this.historyService
      .updateUserHistoryQuestion({
        ...this.userHistorial,
        earlyMenopause:
          this.formPreguntasMenopausiaTemprana.value.earlyMenopause === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X')
        return res;
      });
  }

  submitUterineFibroids(): void {
    this.historyService
      .updateUserHistoryQuestion({
        ...this.userHistorial,
        uterineFibroids:
          this.formPreguntasMioma.value.uterineFibroids === false ? 0 : 1,
      })
      .subscribe((res) => {
        this.openSnackBar('Guardado con éxito', 'X')
        return res;
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
