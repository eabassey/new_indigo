import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeActivateComponent } from './node-activate.component';

describe('NodeActivateComponent', () => {
  let component: NodeActivateComponent;
  let fixture: ComponentFixture<NodeActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
