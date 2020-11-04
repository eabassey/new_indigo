import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigActivateComponent } from './state-config-activate.component';

describe('StateConfigActivateComponent', () => {
  let component: StateConfigActivateComponent;
  let fixture: ComponentFixture<StateConfigActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
