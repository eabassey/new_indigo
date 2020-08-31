import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FLXCallLogComponent } from './call-log.component';

describe('CallLogComponent', () => {
  let component: FLXCallLogComponent;
  let fixture: ComponentFixture<FLXCallLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FLXCallLogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FLXCallLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
