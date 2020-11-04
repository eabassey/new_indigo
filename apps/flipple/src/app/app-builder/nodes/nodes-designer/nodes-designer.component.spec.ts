import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesDesignerComponent } from './nodes-designer.component';

describe('NodesDesignerComponent', () => {
  let component: NodesDesignerComponent;
  let fixture: ComponentFixture<NodesDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
