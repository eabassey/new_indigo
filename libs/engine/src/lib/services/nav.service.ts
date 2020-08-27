import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavService {
  portalActions = new BehaviorSubject<{ call: string; paramFunc: any }>({ call: '', paramFunc: () => {} });
}
