import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'flx-nested-object-key-value-list',
  templateUrl: './nested-object-key-value-list.component.html',
  styleUrls: ['./nested-object-key-value-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXNestedObjectKeyValueListComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() objectInfo$: BehaviorSubject<any>;

  public objectInfoSub: Subscription;
  public objects$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  public fields$: BehaviorSubject<Object> = new BehaviorSubject<object>(null);

  objectIsEmpty(obj) {
    return Object.values(obj).every(x => x === null || x === '');
  }

  removeEmptyProperties(obj) {
    const tempObj = {};

    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        tempObj[key] = value;
      }
    }

    return tempObj;
  }

  ngOnInit(): void {
    this.objectInfoSub = this.objectInfo$.subscribe((job: any) => {
      const tempFields = {};
      const tempObjects = [];

      for (const [key, value] of Object.entries(job)) {
        if (value instanceof Object) {
          if (!this.objectIsEmpty(job[key])) {
            const toPush = this.removeEmptyProperties(job[key]);
            tempObjects.push({ key: key, value$: new BehaviorSubject<object>([toPush]) });
          }
        } else {
          if (value) {
            tempFields[key] = value;
          }
        }
      }

      this.fields$.next([tempFields]);
      this.objects$.next(tempObjects);
    });
  }

  ngOnDestroy(): void {
    if (this.objectInfoSub) {
      this.objectInfoSub.unsubscribe();
    }
  }
}
