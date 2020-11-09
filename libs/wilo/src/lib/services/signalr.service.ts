import { Injectable } from "@angular/core";
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';



@Injectable({providedIn: 'root'})
export class SignalRService {
  hub: HubConnection | undefined;

  constructor() {
    // this.hub = new signalR.HubConnectionBuilder()
    //         .withUrl('https://localhost:44324/loopy')
    //         .configureLogging(signalR.LogLevel.Trace)
    //         .build();

    //     this.hub.start().catch(err => console.error(err.toString()));

        // this._hubConnection.on('Send', (data: any) => {
        //     const received = `Received: ${data}`;
        //     this.messages.push(received);
        // });
  }
}
