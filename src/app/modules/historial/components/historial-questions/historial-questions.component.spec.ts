import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialQuestionsComponent } from './historial-questions.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

fdescribe('HistorialQuestionsComponent', () => {
  let component: HistorialQuestionsComponent;
  let fixture: ComponentFixture<HistorialQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialQuestionsComponent],
      imports: [MatChipsModule, MatCardModule, MatRadioModule]
    });
    fixture = TestBed.createComponent(HistorialQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleDivCancerMama should toggle mostrarDivCancerMama', () => {
    const initialValue = component.mostrarDivCancerMama;
    component.toggleDivCancerMama();
    const toggledValue = component.mostrarDivCancerMama;

    expect(toggledValue).toBe(!initialValue);
  });

  it('toggleDivCancerOvario should toggle mostrarDivCancerOvario', () => {
    const initialValue = component.mostrarDivCancerOvario;
    component.toggleDivCancerOvario();
    const toggledValue = component.mostrarDivCancerOvario;

    expect(toggledValue).toBe(!initialValue);
  });

  it('toggleDivEndiometriosis should toggle mostrarDivEndiometrosis', () => {
    const initialValue = component.mostrarDivEndiometrosis;
    component.toggleDivEndiometriosis();
    const toggledValue = component.mostrarDivEndiometrosis;

    expect(toggledValue).toBe(!initialValue);
  });

  it('toggleDivMioma should toggle mostrarDivMioma', () => {
    const initialValue = component.mostrarDivMioma;
    component.toggleDivMioma();
    const toggledValue = component.mostrarDivMioma;

    expect(toggledValue).toBe(!initialValue);
  });

  it('toggleDivPoliquistico should toggle mostrarDivPoliquistico', () => {
    const initialValue = component.mostrarDivPoliquistico;
    component.toggleDivPoliquistico();
    const toggledValue = component.mostrarDivPoliquistico;
  
    expect(toggledValue).toBe(!initialValue);
  });
  
  it('toggleDivMenopausia should toggle mostrarDivMenopausia', () => {
    const initialValue = component.mostrarDivMenopausia;
    component.toggleDivMenopausia();
    const toggledValue = component.mostrarDivMenopausia;
  
    expect(toggledValue).toBe(!initialValue);
  });

});
