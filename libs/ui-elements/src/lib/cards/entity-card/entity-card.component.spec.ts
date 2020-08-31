import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, ViewChild } from '@angular/core';
import { FLXEntityCardComponent } from './entity-card.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { EntityData, EntityCardState } from './models';

describe('EntityCardComponent', () => {
  let component: FLXEntityCardComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [FLXEntityCardComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    component.data$ = {
      entityId: 1,
      cardStateInfo: {
        state: EntityCardState.info,
        blurb: 'string',
      },
      columns: [
        {
          title: 'string',
          subTitle: 'string',
          description: 'string',
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  @Component({
    selector: `host-component`,
    template: `
      <flx-entity-card></flx-entity-card>
    `,
  })
  class TestHostComponent {
    @ViewChild(FLXEntityCardComponent, { static: true })
    public componentUnderTestComponent: FLXEntityCardComponent;
  }
});
