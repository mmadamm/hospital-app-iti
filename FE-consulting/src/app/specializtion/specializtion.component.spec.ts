import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializtionComponent } from './specializtion.component';

describe('SpecializtionComponent', () => {
  let component: SpecializtionComponent;
  let fixture: ComponentFixture<SpecializtionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecializtionComponent]
    });
    fixture = TestBed.createComponent(SpecializtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
