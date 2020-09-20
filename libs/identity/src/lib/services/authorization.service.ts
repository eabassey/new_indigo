import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable, EMPTY } from 'rxjs';
import { map, takeWhile, switchMap, tap } from 'rxjs/operators';
import { getCurrentUser } from '../store/identity.selector';

@Injectable()
export class AuthorizationService {
  // currentUser$: Observable<any>;
  // allStates$: Observable<any[]>;

  constructor(private store: Store<any>) {
    // this.currentUser$ = this.store.select(getCurrentUser);
    // console.log({ building: 'Authorizaion service' });
    // this.allStates$ = this.store.select(getStates);
  }
  get currentUser$() {
    return this.store
      .select(getCurrentUser)
      .pipe
      // tap((x) => {
      //   console.log(x);
      // }),
      ();
  }
  /**
   * Checks if user can view current state
   * @param {number} stateId The ID of the state
   */
  // userCanView(stateId: number): Observable<boolean> {
  //   return this.currentUser$.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         const userRoles: any[] = user.user.roles;
  //         return this.allStates$.pipe(
  //           map(states => {
  //             const state = states.find(s => s.id === stateId);
  //             if (state) {
  //               return userRoles.some(value =>
  //                 state.view_roles.includes(value)
  //               );
  //             }
  //           })
  //         );
  //       } else {
  //         return EMPTY;
  //       }
  //     })
  //   );
  // }

  /**
   * Checks if user can edit current state
   * @param {number} stateId The ID of the state
   */
  userCanEdit(stateId: number): Observable<boolean> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user && user.user) {
          const userEditStates: any[] = user.user.edit_states;
          const canEdit = userEditStates.includes(stateId);
          return of(canEdit);
        } else {
          return EMPTY;
        }
      })
    );
  }

  /** Allow or disallow based on role
   * @param {Array<UserRole>} role Array of one or more roles of the current user to be checked.
   */
  userIsInRole(role: any[]): Observable<boolean> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user && user.user) {
          const userRoles: any[] = user.user.roles;
          const userInRole = role.some(r => userRoles.includes(r));
          // console.log({ role, userInRole });
          return of(userInRole);
        } else {
          return EMPTY;
        }
      })
    );
  }

  /** Check which staff_type this user belongs to. Example, SIL or SP.
   * @param {StaffType} staffType The StaffType of the current User to be checked.
   */
  staffType(staffType: any): Observable<boolean> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (user && user.user) {
          const userStaffType = user.user.staff_type as number;
          const passed = <number>staffType === userStaffType;
          return of(passed);
        } else {
          return EMPTY;
        }
      })
    );
  }

  get userStaffType(): Observable<number> {
    return this.currentUser$.pipe(
      takeWhile(user => !!user),
      map(user => user.user.staff_type)
    );
  }

  get userRoles(): Observable<number[]> {
    return this.currentUser$.pipe(
      takeWhile(user => !!user),
      map(user => user.user.roles)
    );
  }
}
