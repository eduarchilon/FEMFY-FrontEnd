import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cycle } from 'src/app/models/cicle.model';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { editUserData } from 'src/app/services/redux/actions/user/user-data-page.action';
import { AppState } from 'src/app/services/redux/store/app.store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { cycleUserInit } from 'src/app/services/redux/actions/cycle/cycle-user.page.action';
import { constants } from 'src/app/constans/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-cycle',
  templateUrl: './delete-cycle.component.html',
  styleUrls: ['./delete-cycle.component.scss'],
})
export class DeleteCycleComponent implements OnInit {
  cycleChart!: Cycle;

  constructor(
    private dialogRef: MatDialogRef<DeleteCycleComponent>,
    private cicleService: CicleService,
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cycleChart = this.data?.cycleChart;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteCycle(cycleChart: Cycle | any): void {
    this.cicleService.deleteCycle(cycleChart?.id).subscribe({
      next: (response: any) => {
        this.loaderService.showLoader();
        if (response) {
          this.closeDialog();
          this.loaderService.hideLoader();
        }
      },
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.loaderService.showLoader();
      this.store?.dispatch(cycleUserInit());
      this.localStorageService.setKeyValueLocalStorage(
        constants.USER,
        JSON.stringify({
          ...this.localStorageService.getUserByLogin(),
          state: '',
        })
      );
      this.loaderService.hideLoader();
      this.openSnackBar('Ciclo eliminado', 'X');
    });
    this.store.dispatch(
      editUserData({
        userData: {
          ...this.localStorageService.getUserByLogin(),
          state: '',
        },
      })
    );
    this.loaderService.hideLoader();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
