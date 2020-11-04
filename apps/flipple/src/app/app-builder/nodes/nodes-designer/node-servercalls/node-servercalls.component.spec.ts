import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeServercallsComponent } from './node-servercalls.component';

describe('NodeServercallsComponent', () => {
  let component: NodeServercallsComponent;
  let fixture: ComponentFixture<NodeServercallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeServercallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeServercallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
