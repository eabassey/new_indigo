import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { AppConfig, NodeConfig, StateConfig } from '../models';


@Injectable({providedIn: 'root'})
export class ConfigAccessorService {
  private app$ = new BehaviorSubject<AppConfig>(null);
  private state$ = new BehaviorSubject<StateConfig>(null);
  private node$ = new BehaviorSubject<NodeConfig>(null);

  setApp(app: AppConfig) {
    this.app$.next(app);
  }

  setState(state: StateConfig) {
    this.state$.next(state);
  }

  setNode(node: NodeConfig) {
    this.node$.next(node);
  }

  get currentApp$ () {
    return this.app$.asObservable();
  }

  get currentState$ () {
    return this.state$.asObservable();
  }

  get currentNode$ () {
    return this.node$.asObservable();
  }
}
