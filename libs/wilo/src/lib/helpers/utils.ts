import {  TemplateDefinition, NodeConfig, EventConfig, ServerCallConfig, ActionPanelConfig, StateConfig, ServerQueryConfig, DoRule, ActionRule } from '../models';
import { CoreServices } from '../services';
import { map, delay, switchMap, distinctUntilChanged, pluck, skipWhile, take } from 'rxjs/operators';
import { combineLatest, empty, interval, of, Subscription, Observable, fromEvent } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { setVariable } from '../store';
import { getVariable } from '../store/selectors/variable.selectors';
import { DecisionNodeComponent } from '../components/decision-node.component';
import { RulesService } from '../rules.service';
import * as TP from '../templates';



export const renderTemplateDefs = (activeNode: NodeConfig, svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) => {
    if (activeNode.nodeType === 'decision') {
      return [{component: DecisionNodeComponent, inputs: {activeNode}}];
    } else if (typeof activeNode.component === 'string') {
      const inputs = transformInputs(activeNode.inputs, svc);
      const outputs = transformOutputs(activeNode.outputs, svc, route, rulesService);
      return [{component: TP[activeNode.component], inputs, outputs}];
    } else {
      return (activeNode.component as TemplateDefinition).children.map((def) => {
        let inputs = {};
        inputs = activeNode.inputs ? {...inputs, ...activeNode.inputs} : inputs;
        inputs = def.inputs ? {...inputs, ...def.inputs} : inputs;
        const localInputs = transformInputs(inputs, svc);
        let outputs = {};
        outputs = activeNode.outputs ? {...outputs, ...activeNode.outputs} : outputs;
        outputs = def.outputs ? {...outputs, ...def.outputs} : outputs;

        const localOutputs = transformOutputs(outputs, svc, route, rulesService);
        return {
              component: TP[def.component],
              inputs: localInputs,
              outputs: localOutputs
            };
          });

    }
};

const transformOutputs = (outputs: {[key: string]: ActionRule[]}, svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) => {
  return outputs ? Object.entries(outputs).reduce((acc, [key, rules]) => {
    return {
      ...acc,
      [key]: {handler: () => rules.forEach(rule => rulesService.renderActionRule(rule)), args: [] }
    };
  }, {}) : {};
};

const transformInputs = (inputs: {[key: string]: any}, svc: CoreServices) => {
  return inputs ? Object.entries(inputs).reduce((acc, [key, value]: [string, any]) => {
    if (key.endsWith('$')) {
      let val: Observable<any>;
      if (typeof value === 'string') {
        val = svc.sq.query(value);
      } else {
        // TYPE: VariableQuerySet -> { variableName: '', filterFunctions: {}, sortFunctions: {}}
         // filterCriteria: {filter_down_by_5: {id: {$lt: 5}}, filter_top_by_10: {id: {$gte: 10}}}
        if (value.variableName) {
          val = svc.store.select(getVariable(value.variableName)).pipe(
            skipWhile(x => !x),
            map((querySet) => {
              // querySet -> {dataset: [], filterBy: {'filter_name': arg}, sortBy: {}}
              if (querySet && querySet.filterBy && value.filterCriteria) {
                let result = querySet.dataset;
                const selectedCriteria = Object.keys(querySet.filterBy)
                                          .map(cret => value.filterCriteria[cret]);
                console.log({selectedCriteria})
                // .map(([filterName,]) => value.filterFunctions[filterName](arg));
                // selectedCriteria.forEach(fn => result = result ? result.filter(fn) : result);
                const res = selectedCriteria ? svc.dataQuery.useMongoQuery(result, {criteria: JSON.stringify({$and: selectedCriteria})}) : result;
                return res;
              } else {
                return querySet.dataset;
              }
            })
          );
        } else {
          val = null;
        }
      }
      return {
        ...acc,
        [key]: val, // As Jsonata Query string
      };
    } else {
        return {
          ...acc,
          [key]: value,
        };
    }
  }, {}) : {};
};


// export const renderEvents = (events: {[name: string]: EventConfig}, svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) => {
//     const eventsSubscriptions: Subscription[] = [];
//     if (events) {
//         Object.values(events).forEach((ev: EventConfig) => {
//             //
//             eventsSubscriptions.push(
//               combineLatest([
//                 ...ev.triggerOn.map((trg: string) => {
//                   if (trg.includes('sys@')) {
//                       return getSystemEvent(trg);
//                     } else if (trg.startsWith('form@')) {
//                     return getFormEvent(trg, svc);
//                     } else if(trg.startsWith('html@')) {
//                       // Example: html@#test-id:click
//                       return getHtmlEvent(trg, svc);
//                     }
//                 })
//               ])
//                 .pipe(map(params => ev.triggerWhen(...params)))
//                 .subscribe(shouldFire => {
//                   if (shouldFire) {
//                     ev.dataMutations(svc, route);
//                     if (ev.serverCalls) {
//                       const serverCallsSubs = renderServerCalls(ev.serverCalls, svc, route, rulesService);
//                       eventsSubscriptions.push(...serverCallsSubs);
//                     }
//                   }
//                 })
//             );
//         });
//       }
//     return eventsSubscriptions;
// };


export const getSystemEvent = (trigger: string) => {
    switch (trigger) {
      case 'sys@online': {
        return interval(10).pipe(
            switchMap(() => of(window.navigator.onLine)),
            distinctUntilChanged()
          );
      }
      default:
        return empty();
    }
  };

  export const getFormEvent = (trigger: string, svc: CoreServices) => {
    const trg = trigger.split('@')[1];
    return svc.bf.getControl(trg).valueChanges.pipe(delay(500));
  };

  export const getHtmlEvent = (trigger: string, svc: CoreServices) => {
    const trg = trigger.split('@')[1];
    console.log({trg})
    const [selector, eventName] = trg.split(':');
    return fromEvent(svc.$(selector).get(0), eventName);
  };



export const renderFormModels = (state: StateConfig | ActionPanelConfig) => {
    return Object.values(state.nodes).reduce((acc, node) => {
         return [
             ...acc,
             ...(node && node.inputs && node.inputs.formModel ?  node.inputs.formModel.fields : []),
             ...(node.component && typeof node.component !== 'string' && node.component.children ? (
               node.component.children.reduce((acc2, ch) => {
                     return [
                         ...acc2,
                         ...(ch && ch.inputs && ch.inputs.formModel && ch.inputs.formModel.fields ? ch.inputs.formModel.fields : [])
                     ];
                 }, [])
             ) : [])
         ];
     }, []) || [];
 };

export const renderServerQueries = (serverQueries: ServerQueryConfig[], svc: CoreServices, route: ActivatedRoute) => {
  const subs: Subscription[] = [];
  const tokenSub = svc.auth.getAccessToken().pipe(
    skipWhile(t => !t),
    take(1),
  ).subscribe(accessToken => {
    if (serverQueries && serverQueries.length) {
      serverQueries.forEach(query => {
        const {key, endpoint} = query;
       //  svc.loader.add(key);
        const dataSub = svc.http.post(
          `http://localhost:3000/api/query`,
          endpoint, {headers: { Authorization: 'Bearer ' + accessToken,}}).subscribe(
         (res: any) => {
            svc.store.dispatch(setVariable({key, data: res}));
            svc.keyValueStore.setItem(key, res);
        },
        err => {

        },
        () => {

        });
        subs.push(dataSub);
      });
    }
  });
  subs.push(tokenSub);

  return subs;
 };


export const renderServerCalls = (serverCalls: ServerCallConfig[], svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) => {
  const subs: Subscription[] = [];
  if (serverCalls && serverCalls.length > 0) {
    serverCalls.forEach(call => {
      const {directCall, key, functionName, functionArgs, filterable, sortable, transformResponse,
        onSuccess, onError, onComplete, followUpSuccessCalls, followUpFailCalls, isBackgroundTask} = call;
      if (!isBackgroundTask) {
          svc.loader.add(key);
        }
      const completeFn = () => {
        onComplete ? onComplete.forEach(rule => rulesService.renderActionRule(rule)) : null;
         //
        if (followUpSuccessCalls) {
          const successSubs = renderServerCalls(followUpSuccessCalls, svc, route, rulesService);
          subs.push(...successSubs);
        }
        if (!isBackgroundTask) {
          console.log('lala', key);
          svc.loader.remove(key);
        }
        if (followUpFailCalls) {
          const failSubs = renderServerCalls(followUpFailCalls, svc, route, rulesService);
          subs.push(...failSubs);
        }
      };
      const errorFn = (err) => {
        // set errors to store
        onError ? onError.forEach(rule => rulesService.renderActionRule(rule, err)) : console.error(err);
      };
      const successFn = (results) => {
        //
        let successResults;
        if (transformResponse) {
          successResults = transformResponse(results);
        } else {
          successResults = results;
        }

        if (key) { // IF KEY IS SET
          const data = {} as any;
          data.dataset = successResults;
          if (filterable) {
            data.filterBy =  {}; // {by_state: 25, by_state2: 10}; // filter and arg
          }
          if (sortable) {
            data.sortBy = {};
          }
          svc.store.dispatch(setVariable({key, data}));
          svc.keyValueStore.setItem(key, data);
        }
        if (onSuccess)
         onSuccess.forEach(rule => rulesService.renderActionRule(rule, successResults, call))
      };
      //
      if (functionName) {
         const funcSub = (svc.clientService[functionName](functionArgs) as Observable<any>)
          .subscribe(successFn, errorFn, completeFn);
         subs.push(funcSub);

      } else if (directCall) {
         const directSub = rulesService.renderReturnRule(directCall)
          .subscribe(successFn, errorFn, completeFn);
         subs.push(directSub);
      }
  });
  }
  return subs;
};
