import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionIconEnum, ActionableTableAction } from './models';
import { returnOrDefault } from '@indigo/utilities';

@Component({
  selector: 'flx-actionable-table-card',
  templateUrl: './actionable-table-card.component.html',
  styleUrls: ['./actionable-table-card.component.scss'],
})
export class FLXActionableTableCardComponent implements OnInit {
  // ========================= INTERNAL VARIABLES =========================== //
  private _date: any;
  private _additionalItems: any[];
  private _eventType: any;
  private _description: any;
  private _actions: ActionableTableAction[];

  // ========================= INPUTS ========================== //
  @Input()
  set date(date: any) {
    this._date = date;
  }
  get date() {
    return returnOrDefault(this._date, null);
  }

  @Input()
  set eventType(eventType: any) {
    this._eventType = eventType;
  }
  get eventType() {
    return returnOrDefault(this._eventType, null);
  }

  @Input()
  set additionalItems(additionalItems: any[]) {
    this._additionalItems = additionalItems;
  }
  get additionalItems() {
    return returnOrDefault(this._additionalItems, null);
  }

  @Input()
  set description(description: any) {
    // this._description = {
    //   title: 'Comment',
    //   value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbb1___',
    // };
    this._description = description;
  }
  get description() {
    return returnOrDefault(this._description, null);
  }

  @Input()
  set actions(actions: ActionableTableAction[]) {
    this._actions = actions;
  }
  get actions() {
    return returnOrDefault(this._actions, []);
  }

  @Output()
  handleAction = new EventEmitter();

  // ========================= VARIABLES ============================= //
  iconEnum = ActionIconEnum;

  // ================= constructor ==========================
  constructor() {}

  // ======================== LIFE-CYLCLE METHODS ========================= //
  ngOnInit() {}

  // ======================== COMPONENT FUNCTIONS ========================= //
  handleEvent(name: string) {
    this.handleAction.emit({ callback: name });
  }
}
