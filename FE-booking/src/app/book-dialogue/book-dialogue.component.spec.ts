import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDialogueComponent } from './book-dialogue.component';

describe('BookDialogueComponent', () => {
  let component: BookDialogueComponent;
  let fixture: ComponentFixture<BookDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDialogueComponent]
    });
    fixture = TestBed.createComponent(BookDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
