import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumComponent } from './forum.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumComponent],
      imports: [HttpClientModule, MatDialogModule],
    });

    fixture = TestBed.createComponent(ForumComponent); // Create a component fixture
    component = fixture.componentInstance; // Get an instance of the component from the fixture
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRedirectUrl should return the correct URL for a topic', () => {
    const sampleTopicId = 123;
    const expectedUrl = '/foro/123'; 
    const result = component.getRedirectUrl(sampleTopicId);

    expect(result).toBe(expectedUrl);
  });
});
