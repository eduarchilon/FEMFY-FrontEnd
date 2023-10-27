import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationComponent } from './documentation.component';

xdescribe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentationComponent]
    });
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
