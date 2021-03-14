
import { Action } from '@ngrx/store';

import { Todo } from 'src/app/Todo.model';
export const FETCH_TODO_START = 'FETCH_TODO_START';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAIL = 'FETCH_TODO_FAIL';
export const TODO_ADD_START = 'TODO_ADD_START';
export const TODO_ADD_SUCCESS = 'TODO_ADD_SUCCESS';
export const TODO_ADD_FAIL = 'TODO_ADD_FAIL';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_START = 'UPDATE_TODO_START';
export const UPDATE_TODO_FAIL = 'UPDATE_TODO_FAIL';
export const DELETE_TODO_START = 'DELETE_TODO_START';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAIL = 'DELETE_TODO_FAIL';

export class UpdateTodoStart implements Action {
  readonly type = UPDATE_TODO_START;
  constructor(
    public payload: {
      frontendid:number;
      todoid: number;
      taskString: string;
      completedString: string;
    }
  ) {}
}
export class UpdateTodoSuccess implements Action {
  readonly type = UPDATE_TODO_SUCCESS;
  constructor(
    public payload: {
      todoid: number;
      taskString: string;
      completedString: string;
    }
  ) {}
}
export class UpdateTodoFail implements Action {
  readonly type = UPDATE_TODO_FAIL;
  
}
export class TodoAddStart implements Action {
  readonly type = TODO_ADD_START;
  constructor(
    public payload: { taskString: string; completedString: String }
  ) {}
}


export class TodoAddSuccess implements Action {
  readonly type = TODO_ADD_SUCCESS;
  constructor(
    public payload: Todo
    //{ taskString: string; completedString: String }
  ) {}
}
export class TodoAddFail implements Action {
  readonly type = TODO_ADD_FAIL;
  constructor(
    public payload: String
    //{ taskString: string; completedString: String }
  ) {}
}
export class FetchTodoStart implements Action {
  readonly type = FETCH_TODO_START;
  constructor(public payload: { userid: number }) {}
}

export class FetchTodoSuccess implements Action {
  readonly type = FETCH_TODO_SUCCESS;
  constructor(public payload: { todos: Todo[] }) {}
}

export class FetchTodoFail implements Action {
  readonly type = FETCH_TODO_FAIL;
  //constructor(public payload:{userid:number}){}
}

export class DeleteTodoStart implements Action{
  readonly type=DELETE_TODO_START;
  constructor(public payload:{id:number,frontendid:number}){}
}
export class DeleteTodoFail implements Action{
  readonly type=DELETE_TODO_FAIL;
}
export class DeleteTodoSuccess implements Action{
  readonly type=DELETE_TODO_SUCCESS;
  constructor(public payload:{id:number}){}
}
export type todoActions =
  | FetchTodoStart
  | FetchTodoSuccess
  | FetchTodoFail
  | TodoAddStart
  | UpdateTodoStart|UpdateTodoSuccess|UpdateTodoFail
  |TodoAddFail
  |TodoAddSuccess
  |DeleteTodoStart|DeleteTodoFail|DeleteTodoSuccess;
