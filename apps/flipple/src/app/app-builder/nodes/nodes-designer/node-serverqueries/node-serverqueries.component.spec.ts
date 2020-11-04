import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeServerqueriesComponent } from './node-serverqueries.component';

describe('NodeServerqueriesComponent', () => {
  let component: NodeServerqueriesComponent;
  let fixture: ComponentFixture<NodeServerqueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeServerqueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeServerqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
