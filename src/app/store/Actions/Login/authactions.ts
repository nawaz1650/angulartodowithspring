import { Action } from '@ngrx/store';
import { Todo } from 'src/app/Todo.model';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
interface UserInterfce {
  userid: number;
  username: string;
  todos: Todo[];
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { username: string; password: string }) {}
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(
    public payload: { userid: number; username: string; password: string }
  ) {}
}

export class SignupFail implements Action {
  readonly type = SIGNUP_FAIL;
  constructor(public payload: string) {}
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { username: string; password: String }) {}
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: UserInterfce) {}
}
export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export type authactions = LoginFail | LoginSuccess | LoginStart|SignupStart|SignupSuccess|SignupFail;
