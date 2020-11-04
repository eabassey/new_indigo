import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigDeactivateComponent } from './state-config-deactivate.component';

describe('StateConfigDeactivateComponent', () => {
  let component: StateConfigDeactivateComponent;
  let fixture: ComponentFixture<StateConfigDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
