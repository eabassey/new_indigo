import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigEventsComponent } from './state-config-events.component';

describe('StateConfigEventsComponent', () => {
  let component: StateConfigEventsComponent;
  let fixture: ComponentFixture<StateConfigEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
