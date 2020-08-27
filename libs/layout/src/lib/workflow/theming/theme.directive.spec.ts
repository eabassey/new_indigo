import { async, TestBed } from '@angular/core/testing';
import { ThemeDirective } from './theme.directive';

describe('ThemeDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeDirective]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ThemeDirective).toBeDefined();
  });
});
