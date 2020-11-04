import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigDeactivateComponent } from './application-config-deactivate.component';

describe('ApplicationConfigDeactivateComponent', () => {
  let component: ApplicationConfigDeactivateComponent;
  let fixture: ComponentFixture<ApplicationConfigDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
