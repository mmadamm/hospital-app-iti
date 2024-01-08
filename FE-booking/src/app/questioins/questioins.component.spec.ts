import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioinsComponent } from './questioins.component';

describe('QuestioinsComponent', () => {
  let component: QuestioinsComponent;
  let fixture: ComponentFixture<QuestioinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestioinsComponent]
    });
    fixture = TestBed.createComponent(QuestioinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
