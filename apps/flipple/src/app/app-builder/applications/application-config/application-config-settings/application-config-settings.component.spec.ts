import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigSettingsComponent } from './application-config-settings.component';

describe('ApplicationConfigSettingsComponent', () => {
  let component: ApplicationConfigSettingsComponent;
  let fixture: ComponentFixture<ApplicationConfigSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
