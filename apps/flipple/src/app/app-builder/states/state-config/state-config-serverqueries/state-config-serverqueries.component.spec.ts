import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateConfigServerqueriesComponent } from './state-config-serverqueries.component';

describe('StateConfigServerqueriesComponent', () => {
  let component: StateConfigServerqueriesComponent;
  let fixture: ComponentFixture<StateConfigServerqueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigServerqueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigServerqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
