import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FLXDropdownComponent } from './dropdown.component';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FLXAlertsModule } from '../../alerts';
import { FLXInputTextModule } from '../input-text/input-text.module';
import { FLXIconModule } from '../../inline-icons/icon.module';
import { CommonModule } from '@angular/common';
// import { Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER } from '../../../lib/actions-and-effects/dialogue/dialog/dialog.service';

import { FLXPopupOverlayPickerModule } from '../../popup-overlay-picker';

describe('Select', () => {
  let component: FLXDropdownComponent;
  let fixture: ComponentFixture<FLXDropdownComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FLXDropdownComponent],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        ReactiveFormsModule,
        FLXAlertsModule,
        FLXInputTextModule,
        FLXPopupOverlayPickerModule,
        FLXIconModule,
      ],
      // providers: [Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(FLXDropdownComponent);
    component = fixture.componentInstance;

    component.itemsOption = [
      { display: 'test', value: 1 },
      { display: 'sibusiso', value: 2 },
      { display: 'hugo', value: 3 },
      { display: 'Titenda', value: 4 },
      { display: 'Thami', value: 5 },
    ];
  }));

  it('Should create select component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should accept inputs list of values', () => {
    fixture.detectChanges();
    expect(component.lstItemDataSet[0].display).toEqual('test');
  });

  it('Should accept inputs for display options', () => {
    fakeAsync(() => {
      component.displayOptions = { displayKey: 'name', valueKey: 'id' };
      component.itemsOption = [
        { name: 'test', id: 1 },
        { name: 'sibusiso', id: 2 },
        { name: 'hugo', id: 3 },
        { name: 'Titenda', id: 4 },
        { name: 'Thami', id: 5 },
      ];
      expect(component.lstItemDataSet[3].name).toEqual('Titenda');
    });
  });

  it('Should show search box for filter', () => {
    fakeAsync(() => {
      const input: ElementRef = fixture.debugElement.query(By.css('input[type=text]'));
      fixture.detectChanges();
      expect(input).toBeTruthy();
    });
  });

  it('Typing in searchFilter should filter the list ', () => {
    fakeAsync(() => {
      const elementEl: ElementRef = fixture.debugElement.query(By.css('input[type=text]'));
      elementEl.nativeElement.value = 'sibu';
      elementEl.nativeElement.change();
      fixture.detectChanges();
      expect(component.searchFilter).toHaveBeenCalled();
      expect(component.lstItemDataSet[0].display).toBe('sibusiso');
    });
  });

  it('Should output select data ', () => {
    fakeAsync(() => {
      const item = { name: 'sibusiso', id: 2 };
      component.onItemSelected(item);
      fixture.detectChanges();
      expect(component.handleChanges).toHaveBeenCalledWith(2);
    });
  });
});

// FLXPopupOverlayPickerModule,
