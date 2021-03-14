import {
  FetchTodoStart,
  FETCH_TODO_SUCCESS,
} from './../store/Actions/Login/Todo/Todo-actions';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../store/Reducers/Appreducer';
import { take } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class TodoResolver implements Resolve<any> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(
      new FetchTodoStart({ userid: +localStorage.getItem('userid') })
    );
    return this.actions$.pipe(ofType(FETCH_TODO_SUCCESS), take(1));
  }
}
