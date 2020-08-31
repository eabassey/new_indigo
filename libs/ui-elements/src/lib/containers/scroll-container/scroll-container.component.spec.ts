import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FLXScrollContainerComponent } from './scroll-container.component';

describe('FLXScrollContainerComponent', () => {
  let component: FLXScrollContainerComponent;
  let fixture: ComponentFixture<FLXScrollContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FLXScrollContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FLXScrollContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
