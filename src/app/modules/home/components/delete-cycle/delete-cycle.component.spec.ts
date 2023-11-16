import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCycleComponent } from './delete-cycle.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CicleService } from 'src/app/services/cicle/cicle.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { LoaderService } from 'src/app/services/loader/loader.service';

fdescribe('DeleteCycleComponent', () => {
  let component: DeleteCycleComponent;
  let fixture: ComponentFixture<DeleteCycleComponent>;
  let cicleService: jasmine.SpyObj<CicleService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    cicleService = jasmine.createSpyObj('CicleService', ['deleteCycle']);
    loaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);

    TestBed.configureTestingModule({
      declarations: [DeleteCycleComponent],
      providers: [
        { provide: Store, useValue: {} },
        { provide: CicleService, useValue: cicleService },
        { provide: MatDialogRef, useValue: {} as MatDialogRef<DeleteCycleComponent> },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LoaderService, useValue: loaderService },
      ],
      imports: [MatDialogModule, HttpClientModule, MatIconModule],
    });

    fixture = TestBed.createComponent(DeleteCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /* it('deleteCycle should call CicleService.deleteCycle and close dialog', () => {
    const cycleChart = { id: 1 };
    cicleService.deleteCycle.and.returnValue(of({}));
    const dialogRef = TestBed.inject(MatDialogRef);
    component.deleteCycle(cycleChart);

    expect(cicleService.deleteCycle).toHaveBeenCalledWith(cycleChart.id);
    expect(dialogRef.close).toHaveBeenCalled();
  });*/
});
