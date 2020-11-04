import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigServercallsComponent } from './application-config-servercalls.component';

describe('ApplicationConfigServercallsComponent', () => {
  let component: ApplicationConfigServercallsComponent;
  let fixture: ComponentFixture<ApplicationConfigServercallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigServercallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigServercallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
