import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, ViewChild } from '@angular/core';
import { FLXEntityListComponent } from './entity-list.component';

describe('EntityListComponent', () => {
  let component: FLXEntityListComponent;
  let fixture: ComponentFixture<FLXEntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FLXEntityListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FLXEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
