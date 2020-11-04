import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigSettingsComponent } from './state-config-settings.component';

describe('StateConfigSettingsComponent', () => {
  let component: StateConfigSettingsComponent;
  let fixture: ComponentFixture<StateConfigSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
