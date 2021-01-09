import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControlOptions } from '@angular/forms';
import { CustomValidators, cleanUpSub } from '@indigo/utilities';

export interface DefaultOrganismConfig {
  parentForm?: FormGroup;
}

@Component({selector: 'parent', template: ''})
export abstract class ParentOrganismComponent<OrganismData, OrganismConfig = DefaultOrganismConfig, OrganismOutputShape = any>
  implements OnInit, OnDestroy {
  // ===========================================  Variables ===========================================================
  // ---------------------------------------- Internal Variables ------------------------------------------
  // ============================================= Inputs =============================================================
  abstract get config(): OrganismConfig;
  abstract set config(config: OrganismConfig);

  abstract get data$(): Observable<OrganismData>;
  abstract set data$(data$: Observable<OrganismData>);
  // ============================================= Outputs ============================================================
  @Output() outputEventStream: EventEmitter<OrganismOutputShape> = new EventEmitter<OrganismOutputShape>();
  // ============================================ Constructor =========================================================
  // ============================================= Methods ============================================================

  get CustomValidators() {
    return CustomValidators;
  }

  get cleanupSub() {
    return cleanUpSub;
  }



  get Validators() {
    return Validators;
  }
  // ------------------------------------------ Internal Methods ------------------------------------------
  // protected makeControl(initialState = null, options: AbstractControlOptions) {
  //   return new FormControl(initialState, options);
  // }
  protected outputData(dataToOutput: OrganismOutputShape) {
    // console.log({ dataToOutput });
    // if (!this.outputEventStream) {
    //   this.outputEventStream = new EventEmitter<OrganismOutputShape>();
    // }
    this.outputEventStream.emit(dataToOutput);
  }
  // protected abstract composeDataForOutput(): OrganismOutputShape;
  // ----------------------------------------- Life-cycle methods -----------------------------------------
  abstract ngOnInit(): void;
  abstract ngOnDestroy(): void;
  // ------------------------------------------ Workflow Methods ------------------------------------------
}
