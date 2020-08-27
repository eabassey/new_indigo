import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreServices } from './core.services';

@Injectable({providedIn: 'root'})
export class ModalService {
  modalActions = new BehaviorSubject<Function>(null);

  openModalDirectly(func: (svc: CoreServices) => void) {
    this.modalActions.next(func);
  }
}
