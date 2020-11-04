// import { Component, OnInit } from '@angular/core';
// import { CoreServices } from '@wilo';
// import { FormControl } from '@angular/forms';


// @Component({
//   selector: 'search-filter',
//   template:`
//    <flx-flex-container>
//   <div *ngIf="usedFilterKeys.length > 0" class="filter-list-container">
//     <flx-heading type="page" size="medium">Selected Filters</flx-heading>
//     <ng-container *ngFor="let usedFilterKey of usedFilterKeys">
//       <div class="filter-entry">
//         <div class="filter-name">
//           <span class="filter-info">{{ usedFilterKey }}</span>
//         </div>
//         <div class="filter-value">
//           <span *ngFor="let value of usedFilters[usedFilterKey].values" class="filter-info">
//             <ng-container [ngSwitch]="usedFilterKey">
//               <ng-container *ngSwitchCase="'State'">{{ value | stateName: states }}</ng-container>
//               <ng-container *ngSwitchCase="'Required Skill'">{{ value | spSkillName: skills }}</ng-container>
//               <ng-container *ngSwitchCase="'Service Provider'">{{ value | spName: sps }}</ng-container>
//               <ng-container *ngSwitchDefault>{{ value }}</ng-container>
//             </ng-container>
//           </span>
//         </div>
//         <!-- <flx-button class="filter-info" (click)="removeFilter(usedFilterKey)" color="secondary" size="small">Remove Filter</flx-button> -->
//         <flx-icon hover="secondary" class="filter-info" (click)="removeFilter(usedFilterKey)" type="remove"></flx-icon>
//       </div>
//     </ng-container>
//     <!-- bellow ads a filter -->
//     <flx-glow-line margin="0 0 1rem 0"></flx-glow-line>
//   </div>
//   <!-- <flx-slide-navigation
//     (valueSelection)="handleValueSelection($event)"
//     [availableFilters]="filteredList"
//     [hasFilteredItems]="usedFilterKeys.length !== 0"
//   ></flx-slide-navigation> -->
//   <div *ngIf="this.currentFrameData as frameData">
//   <div [ngSwitch]="frameData.currentFrame">
//     <div *ngSwitchCase="0">
//       <!-- frame0 -->
//       <flx-button
//         color="primary"
//         display="block"
//         class="filter-inputs button"
//         (click)="handleFrameEvent(frameData.currentFrame, $event)"
//         >ADD FILTER</flx-button
//       >
//     </div>
//     <div *ngSwitchCase="1">
//       <!-- frame 1-->
//       <form [formGroup]="frameData.formGroup">
//         <div class="filter-form"><flx-heading type="page" size="medium">Filter Workflow</flx-heading></div>
//         <!-- <p>{{ currentFrameData.framePrompt}}</p> -->
//         <flx-select-list
//           height="50vh"
//           formControlName="initialSelect"
//           [options$]="frameData.frameData"
//           [canFilter]="false"
//         >
//         </flx-select-list>
//       </form>
//     </div>
//     <div *ngSwitchCase="2">
//       <!-- frame 2 , aka an actual form -->
//       <!-- <div (click)="resetSelection()">x</div> -->
//       <div [ngSwitch]="frameData.frameType">
//         <div *ngSwitchCase="'numericRange'">
//           <form class="filter-info" [formGroup]="frameData.formGroup">
//             <div class="filter-form">
//               <flx-heading class="filter" size="medium">{{ currentFrameData.framePrompt }}</flx-heading>
//               <flx-icon class="filter" (click)="handleFrameEvent(0, null)" type="remove"></flx-icon>
//             </div>
//             <flx-input-text class="filter-inputs" formControlName="min" placeholder="Minimum value"> </flx-input-text>
//             <flx-input-text class="filter-inputs" formControlName="max" placeholder="Maximum value"> </flx-input-text>
//             <!--  the button bellow functions as a listener for the form -->
//             <flx-button display="block" class="filter-inputs button" color="primary" (click)="handleEnterKey()">
//               Continue
//             </flx-button>
//           </form>
//         </div>
//         <div *ngSwitchCase="'select'">
//           <form [formGroup]="frameData.formGroup">
//             <div class="filter-form">
//               <flx-heading size="medium">{{ currentFrameData.framePrompt }}</flx-heading>
//               <flx-icon class="filter" (click)="handleFrameEvent(0, null)" type="remove"></flx-icon>
//             </div>
//             <flx-select-list
//               height="80vh"
//               formControlName="select"
//               [options$]="currentFrameData.frameData"
//               [canFilter]="true"
//             >
//             </flx-select-list>
//           </form>
//         </div>
//         <div *ngSwitchCase="'input'">
//           <form [formGroup]="frameData.formGroup">
//             <div class="filter-form">
//               <flx-heading class="filter-inputs" size="medium">{{ currentFrameData.framePrompt }}</flx-heading>
//               <flx-icon class="filter" (click)="handleFrameEvent(0, null)" type="remove"></flx-icon>
//             </div>
//             <flx-input-text class="filter-inputs" (keyup.enter)="handleEnterKey()" formControlName="control">
//             </flx-input-text>
//             <flx-button class="filter-inputs button" color="primary" (click)="handleEnterKey()">Add Filter</flx-button>
//             <!--  the button bellow functions as a listener for the form -->
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// </flx-flex-container>

//   `,
//   styles: [`
//   :host {
//   width: 100%;
// }

// .filter-entry {
//   display: flex;
//   padding-bottom: 1rem;
//   flex-direction: row;

//   .filter-name {
//     width: 100px;
//     color: var(--secondary);
//   }

//   .filter-value {
//     flex-grow: 1;

//     span {
//       display: inline-block;
//       white-space: nowrap;
//       overflow: hidden;
//       width: 140px;
//       text-overflow: ellipsis;
//     }
//   }
// }

// .heading {
//   height: 56px;
//   display: flex;
//   justify-items: center;
//   line-height: 56px;
// }

// .filter-inputs {
//   display: flex;
//   justify-content: left;
// }

// .filter-inputs.button {
//   justify-content: center;
// }

// .filter-form {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// }

// .filter-info {
//   display: flex;
//   flex-direction: column;
// }

// .filter {
//   display: flex;
// }


//   `]
// })
// export class SearchFilterComponent implements OnInit {
//   states = [];
//   skills = [];
//   sps = [];
//   usedFilterKeys = [];
//   usedFilters = {};
//   choice: string;
//   @Output() valueSelection = new EventEmitter<ValueSelectionEvent>();
//   @Input() availableFilters: FrameConfigurations;
//   @Input() hasFilteredItems: boolean;

//   currentFrameData = {}
//   constructor() {
//     this.resetSelection();
//   }

//   public resetSelection() {
//     this.currentFrameData = { currentFrame: TwoFrameDynamicSelectionFrames.closed };
//     cleanUpSub(this.frameValueSub);
//   }

//   handleFrameEvent(currentFrame: number, event) {
//     switch (currentFrame) {
//       case 0: {
//         // open
//         // set current frame config so we can access it again later
//         // this.currentFrameConfig = {
//         // };
//         const keys = Object.keys(this.availableFilters);
//         const filterList = [];
//         for (const entry of keys) {
//           filterList.push({
//             display: entry,
//             value: entry
//           });
//         }
//         // update the behavior subject so the ui will update
//         this.currentFrameData = {
//           currentFrame: 1,
//           frameData: new BehaviorSubject(filterList),
//           frameType: 'select',
//           framePrompt: 'Select a filter',
//           formGroup: new FormGroup({ initialSelect: new FormControl(null) })
//         };
//         this.frameValueSub = this.currentFrameData.formGroup.valueChanges.pipe(take(1)).subscribe(value => {
//           //           value:
//           // initialSelect: ["input"]
//           this.handleFrameEvent(1, { value: value.initialSelect[0] });
//         });
//         //  create listener
//         break;
//       }
//       case 1: {
//         // render second frame form
//         // const value = ;
//         const choice = event.value;
//         this.choice = choice;
//         this.selectedEntry = this.availableFilters[choice];
//         // make a for based on type
//         const formGroup = new FormGroup({});
//         const context = [];
//         switch (this.selectedEntry.type) {
//           //  currently date range is not supported
//           //  TODO: add in date range
//           // case FilterTypes.dateRange: {
//           //   break;
//           // }
//           case FilterTypes.input: {
//             formGroup.addControl('control', new FormControl(null, [Validators.required]));
//             break;
//           }
//           case FilterTypes.numericRange: {
//             formGroup.addControl(
//               'min',
//               new FormControl(
//                 null,
//                 this.selectedEntry.min !== undefined
//                   ? [Validators.min(this.selectedEntry.min), Validators.required]
//                   : [Validators.required]
//               )
//             );
//             formGroup.addControl(
//               'max',
//               new FormControl(
//                 null,
//                 this.selectedEntry.max !== undefined
//                   ? [Validators.max(this.selectedEntry.max), Validators.required]
//                   : [Validators.required]
//               )
//             );
//             break;
//           }
//           case FilterTypes.select: {
//             //  if its a select we need to generate the options and then later work back.
//             // also create the behavior subject for the context
//             const keys = Object.keys(this.selectedEntry.context);
//             for (const entryKey of keys) {
//               context.push({ display: entryKey, value: this.selectedEntry.context[entryKey] });
//             }
//             formGroup.addControl('select', new FormControl(null));
//             // also should create the subscription
//             this.frameValueSub = formGroup.valueChanges.pipe(take(1)).subscribe(value => {
//               this.handleEnterKey();
//             });
//             break;
//           }
//         }
//         this.currentFrameData = {
//           currentFrame: 2,
//           frameType: this.selectedEntry.type,
//           formGroup,
//           framePrompt: this.selectedEntry.prompt,
//           frameData: this.selectedEntry.type === 'select' ? new BehaviorSubject(context) : undefined
//         };
//         break;
//       }
//       case 2: {
//         //  will have value passed into the event
//         // process value and emit properly
//         const values = [];
//         switch (this.selectedEntry.type) {
//           case FilterTypes.select: {
//             values.push(event.value.select);
//             // shoudl check for a context
//             break;
//           }
//           case FilterTypes.input: {
//             values.push(event.value.control);
//             break;
//           }
//           case FilterTypes.numericRange: {
//             values.push(event.value.min);
//             values.push(event.value.max);
//             break;
//           }
//         }
//         this.valueSelection.next({
//           type: 'value-selected',
//           values,
//           selectedEntry: this.choice,
//           selectionType: this.selectedEntry.type
//         });
//         this.resetSelection();
//         break;
//       }
//     }
//   }
//   // will refactor this to have all functions pass through this specific one and be functional , but for now
//   //  merely using the functionality exposed by the bellow will be good enough
//   handleEnterKey() {
//     // if (this.currentFrameData.formGroup.valid === true) {
//     //   this.handleFrameEvent(this.currentFrameData.currentFrame, { value: this.currentFrameData.formGroup.value });
//     // }
//   }

//   ngOnChanges() {
//     if (!this.hasFilteredItems) {
//       this.handleFrameEvent(0, null);
//     }
//   }

//   ngOnDestroy(): void {
//     cleanUpSub(this.frameValueSub);
//   }
// }
