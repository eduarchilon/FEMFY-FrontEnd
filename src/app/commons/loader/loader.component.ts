import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isShow!: boolean;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService._isShowLoader.subscribe((status: boolean) => {
      this.isShow = status;
    });
  }
}
