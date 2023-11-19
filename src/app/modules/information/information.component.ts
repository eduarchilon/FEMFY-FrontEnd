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

  typeUser!: number | any;

  ngOnInit(): void {
    this.typeUser = this.localStorageService.getUserByLogin()?.typeUserID;
  }
}
