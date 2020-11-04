import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigEventsComponent } from './application-config-events.component';

describe('ApplicationConfigEventsComponent', () => {
  let component: ApplicationConfigEventsComponent;
  let fixture: ComponentFixture<ApplicationConfigEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
