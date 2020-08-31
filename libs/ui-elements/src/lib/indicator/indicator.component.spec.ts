import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FLXIndicatorComponent } from './indicator.component';

describe('IndicatorComponent', () => {
  let component: FLXIndicatorComponent;
  let fixture: ComponentFixture<FLXIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FLXIndicatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FLXIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
