import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigActivateComponent } from './application-config-activate.component';

describe('ApplicationConfigActivateComponent', () => {
  let component: ApplicationConfigActivateComponent;
  let fixture: ComponentFixture<ApplicationConfigActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
