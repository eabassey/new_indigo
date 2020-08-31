import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERGlowLineComponent } from './glow-line.component';

describe('ERGlowLineComponent', () => {
  let component: ERGlowLineComponent;
  let fixture: ComponentFixture<ERGlowLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ERGlowLineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERGlowLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
