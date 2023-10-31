import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/constans/constants';
import { HistorialService } from 'src/app/services/historial/historial.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  constructor(
    private historial: HistorialService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.getUserByLogin()?.idHistorial === undefined) {
      this.historial.getAllQuestionUserHistory().subscribe((history: any[]) => {
        const historyUser = history?.filter(
          (item: any) =>
            item.userId === this.localStorageService.getUserByLogin()?.idUser
        );
        this.localStorageService.setKeyValueLocalStorage(
          constants.USER,
          JSON.stringify({
            ...this.localStorageService.getUserByLogin(),
            idHistorial: historyUser[0]?.id,
          })
        );
        location.reload();
      });
    }
  }
}
