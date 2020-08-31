import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FLXAlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: FLXAlertComponent;
  let fixture: ComponentFixture<FLXAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FLXAlertComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FLXAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
