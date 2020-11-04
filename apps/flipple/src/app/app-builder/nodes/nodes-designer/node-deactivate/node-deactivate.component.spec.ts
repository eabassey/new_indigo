import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDeactivateComponent } from './node-deactivate.component';

describe('NodeDeactivateComponent', () => {
  let component: NodeDeactivateComponent;
  let fixture: ComponentFixture<NodeDeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
