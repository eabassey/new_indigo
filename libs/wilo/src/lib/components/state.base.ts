import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActionPanelConfig, StateConfig, ToolbarControlConfig } from '../models';
import { CoreServices } from '../services/core.services';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { renderServerCalls, renderEvents, renderServerQueries, renderFormModels } from '../helpers/utils';
import { delay } from 'rxjs/operators';
import { RulesService } from '../rules.service';

@Component({template: ''})
export abstract class StateBase implements OnInit, OnDestroy {
    state: StateConfig;
    sub: Subscription;
    eventsSub: Subscription[];
    setValuesSub: Subscription;
    serverCallsSubs: Subscription[];
    serverQueriesSubs: Subscription[];
    controlsSub: Subscription;
    dynamicTabs = [];
    activePanel: ActionPanelConfig;
    panelActionsSub: Subscription;
    panelsMap: {[id: string]: ActionPanelConfig}
    expandActionPanel;
    clickedActionPanel = null;
    panelActions = [];
    paramsSub: Subscription;
    storeMapperSubscription: Subscription;

    constructor(private svc: CoreServices,  private route: ActivatedRoute, private rulesService: RulesService) {}

    ngOnInit() {
      this.initStateLevelVariables();
      this.sub = this.route.data.subscribe((state: StateConfig) => {
        this.state = state;
        this.dynamicTabs = state?.showTabs ? Object.entries(state.nodes).map(([key, node]) => ({
          targetId: key,
          display: node.name,
          show: !node.hideTab
        })) : [];
        console.log({dynTabs: this.dynamicTabs, state})
        this.svc.configAccessor.setState(state);
        this.svc.bf.bigForm.reset({});
        this.handleConfig(state);
      });
      this.panelActionsSub = this.svc.actionPanel.panelActions$.pipe(delay(0)).subscribe((panelsMap) => {
        if (panelsMap && Object.keys(panelsMap)?.length > 0) {
          console.log({panelsMap})
          this.panelsMap = panelsMap;
          const res = Object.values(panelsMap).map(act => ({id: act.id, path: act.id, instruction: act.instruction, icon: act.icon}));
          this.panelActions = res || [];
          this.getQueryParams();
        } else {
          this.panelActions = [];
        }
      });
    }

    initStateLevelVariables() {
      this.svc.data = {};
    }

    getQueryParams() {
      this.paramsSub = this.route.queryParamMap.subscribe((paramMap) => {
          // Initialize the first node
          if (paramMap.has('expandActionPanel')) {
              this.expandActionPanel = paramMap.get('expandActionPanel') === 'true' ? true : false;
              console.log({exp: this.expandActionPanel})
          }
          this.initActionPanel(paramMap.get('panelId'));
      });
  }

  initActionPanel(panel): void {
    if (this.panelsMap && panel && this.clickedActionPanel !== panel) {
        this.clickedActionPanel = panel;
        this.activePanel = this.panelsMap[this.clickedActionPanel];
    }
}


clickPanel(path: string) {
    console.log({path})
    if (this.clickedActionPanel && this.clickedActionPanel === path) {
        this.toggleActionPanel();
      } else {
          this.expandActionPanel = true;
        this.clickedActionPanel = path;
        this.activePanel = this.panelsMap[this.clickedActionPanel];
      }
}

toggleActionPanel() {
    if (this.expandActionPanel) {
          this.expandActionPanel = false;
    } else {
          this.expandActionPanel = true;
    }
}


    handleConfig(state: StateConfig) {
          //
        if (state?.onStateInit) {
            state.onStateInit.forEach(rule => this.rulesService.renderActionRule(rule));
        }
        //
        if (state?.actionPanel) {
            this.svc.actionPanel.setActionPanel(state.actionPanel);
        } else {
          this.svc.actionPanel.setActionPanel({});
        }
        //
        console.log({state})
        const formModel = renderFormModels(state);
        if (formModel) {
          const formGroup = this.svc.bf.createFormGroup(formModel);
          this.svc.bf.initialize(formGroup);
        }
        //
        // initialize form fields
        if (state?.setValuesToBigForm) {
            this.setValuesSub = state.setValuesToBigForm(this.svc, this.route).subscribe();
        }
        if (state?.serverQueries) {
            this.serverQueriesSubs = renderServerQueries(state.serverQueries, this.svc, this.route)
          }
        //
        if (state?.serverCalls) {
            this.serverCallsSubs = renderServerCalls(state.serverCalls, this.svc, this.route, this.rulesService);
        }
        //
        if (state?.events) {
            this.eventsSub = renderEvents(state.events, this.svc, this.route, this.rulesService);
        }
        //
        if (state?.bigFormToStoreMapper) {
          this.storeMapperSubscription = this.svc.bf.bigFormToStoreMapper(state.bigFormToStoreMapper).subscribe(mapped => {
            this.svc.actions.updateSubmissionData(mapped);
            // this.svc.indexedDb.currentItem.put(mapped, 'currentItem');
          });
        }
        //
        if (state?.controls) {
          this.controlsSub = this.rulesService.renderReturnRule<ToolbarControlConfig[]>(state.controls).subscribe(controls => {
            this.svc.headerAcessor.setHeaderControls(controls);
          });
        }
    }



    ngOnDestroy() {
      console.log('changed state!!')
        if (this.eventsSub) {
            this.eventsSub.forEach(sub => sub.unsubscribe());
        }
        if (this.setValuesSub) {
            this.setValuesSub.unsubscribe();
        }
        if (this.serverQueriesSubs) {
            this.serverQueriesSubs.forEach(sb => sb.unsubscribe());
          }
        if (this.serverCallsSubs) {
            this.serverCallsSubs.forEach(sb => sb.unsubscribe());
        }
        if (this.paramsSub) {
          this.paramsSub.unsubscribe();
      }
        if (this.state && this.state.onStateDestroy) {
            this.state.onStateDestroy.forEach(rule => this.rulesService.renderActionRule(rule));
        }
        if (this.panelActionsSub) {
          this.panelActionsSub.unsubscribe();
      }
        if (this.sub) {
          this.sub.unsubscribe();
      }
      if (this.storeMapperSubscription) {
        this.storeMapperSubscription.unsubscribe();
      }
      if (this.controlsSub) {
        this.controlsSub.unsubscribe();
      }
    }


}
