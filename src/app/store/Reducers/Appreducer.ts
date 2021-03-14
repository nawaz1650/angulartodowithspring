import { ActionReducerMap } from '@ngrx/store';
import { Todo } from 'src/app/Todo.model';
import { authReducer } from './authReducer';
import { TodoReducer } from './Todo/TodoReducer';
export interface auth {
  username: String;
  error: String;
  loginTimetamp: Date;
}
export interface todointerface {
  todos: Todo[];
}
export interface AppState {
  auth: auth;
  todos: todointerface;
}
export const Appreducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  todos: TodoReducer,
};
