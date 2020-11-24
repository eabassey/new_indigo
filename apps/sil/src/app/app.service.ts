import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class AppService {
    test() {
        console.log('this is your test ...')
    }
}
