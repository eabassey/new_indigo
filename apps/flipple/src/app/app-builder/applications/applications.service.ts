import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class ApplicationsService {
    applications = [
        {id: '123', name: 'Test App', routeKey: 'testApp'}
    ];
}