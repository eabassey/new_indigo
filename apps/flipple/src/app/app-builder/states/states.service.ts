import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class StatesService {
    states = [
        {id: '5698', name: 'Payment Initiated', routeKey: 'payment-initiated', stateId: 27},
        {id: '6231', name: 'Upload Invoice', routeKey: 'upload-invoice', stateId: 96}
    ];
}
