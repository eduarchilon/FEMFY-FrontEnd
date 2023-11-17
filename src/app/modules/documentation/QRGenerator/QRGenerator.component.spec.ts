import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRGeneratorComponent } from './QRGenerator.component';

describe('QRGeneratorComponent', () => {
  let component: QRGeneratorComponent;
  let fixture: ComponentFixture<QRGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRGeneratorComponent]
    });
    fixture = TestBed.createComponent(QRGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
