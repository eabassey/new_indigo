import { Injectable } from "@angular/core";
import { CoreServices } from './services';


@Injectable({providedIn: 'root'})
export class RealtimeConnectService {
  // on reponse from update, create, delete, if servercall sets realtime to true and app is online
  // notifications
  // lock other item on user's screen when item is taken over by another user
  //
  constructor(
    private svc: CoreServices,
  ) {

  }

  onItemCreated(item) {}

  onItemUpdated(item) {}

  onItemLocked(item) {}
}
