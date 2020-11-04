import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigServerqueriesComponent } from './application-config-serverqueries.component';

describe('ApplicationConfigServerqueriesComponent', () => {
  let component: ApplicationConfigServerqueriesComponent;
  let fixture: ComponentFixture<ApplicationConfigServerqueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigServerqueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigServerqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
