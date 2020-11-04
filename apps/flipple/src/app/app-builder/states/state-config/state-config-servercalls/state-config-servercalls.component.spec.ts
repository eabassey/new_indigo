import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigServercallsComponent } from './state-config-servercalls.component';

describe('StateConfigServercallsComponent', () => {
  let component: StateConfigServercallsComponent;
  let fixture: ComponentFixture<StateConfigServercallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigServercallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigServercallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
