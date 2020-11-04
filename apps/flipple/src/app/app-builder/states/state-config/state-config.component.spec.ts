import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigComponent } from './state-config.component';

describe('StateConfigComponent', () => {
  let component: StateConfigComponent;
  let fixture: ComponentFixture<StateConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
