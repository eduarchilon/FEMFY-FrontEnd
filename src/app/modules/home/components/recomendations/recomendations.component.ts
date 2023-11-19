import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Recomendations,
  RecommendationsByFamilyHistory,
} from 'src/app/models/recoemndation.model';
import { UserResponse } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { RecomendationService } from 'src/app/services/recomendation/recomendation.service';
import { RecomendationDialogComponent } from '../recomendation-dialog/recomendation-dialog.component';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.scss'],
})
export class RecomendationsComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollingContent') scrollingContent!: ElementRef;

  userAuth!: UserResponse;

  isNull: boolean = false;

  recommendations!: Recomendations;

  constructor(
    private recomendationService: RecomendationService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userAuth = this.localStorageService.getUserByLogin();
    this.recomendationService
      .getRecommendationsByIdUsing(this.userAuth?.idUser)
      .subscribe((res: Recomendations | any) => {
        this.recommendations = res;
        if (res?.recommendationsByFamilyHistory?.length > 0) {
          this.isNull = true;
        } else if (res?.recommendationsByDocuments?.length > 0) {
          this.isNull = true;
        } else if (res?.recommendationsByTypeUser?.length > 0) {
          this.isNull = true;
        } else {
          this.isNull = false;
        }
        console.log(this.isNull);
      });
  }

  ngAfterViewInit() {
    //this.scrollAutomatically();
  }

  viewRecomendation(recommendation: RecommendationsByFamilyHistory): void {
    this.dialog.open(RecomendationDialogComponent, {
      panelClass: [
        '!max-w-[95vw]',
        'max-lg:!w-[80%]',
        'max-md:!w-[100vw]',
        'max-xl:!w-[50%]',
        '!w-[50%]',
        '!rounded-[20px]',
      ],
      data: {
        recommendation,
      },
    });
  }

  // scrollAutomatically() {
  //   setInterval(() => {
  //     this.scrollingContent.nativeElement.scrollTop += 1;
  //   }, 50);
  // }
}
