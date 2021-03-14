import { Component } from '@angular/core';
import * as todoActions from './../../Actions/Login/Todo/Todo-actions';
import * as TodoActions from '../../Actions/Login/Todo/Todo-actions';
import { TodoService } from 'src/app/todo.service';

const initialState = {
  todos: [],
};
export function TodoReducer(
  state = initialState,
  action: TodoActions.todoActions
) {
  switch (action.type) {
    case TodoActions.FETCH_TODO_SUCCESS:
      console.log('from todo reducer ', action.payload);
      return { ...state, todos: action.payload.todos };
    case TodoActions.FETCH_TODO_FAIL:
      return state;
    case todoActions.TODO_ADD_SUCCESS:
      const temp = [...state.todos];
      temp.push(action.payload);
      return { todos: temp };
    case todoActions.UPDATE_TODO_SUCCESS:
      //const temp3 = { ...state.todos[action.payload.todoid] };
      //console.log('', temp3);
      //temp3['taskString'] = action.payload.taskString;
      //const temp4 = { ...state.todos };
      //temp4[action.payload.todoid] = temp3;
      //return { ...state, todos: temp4 };
      const index = action.payload.todoid;
      const task = action.payload.taskString;
      const completed = action.payload.completedString;
      const todoarr = [...state.todos];
      const existingid = state.todos[index].todoid;
      todoarr[index] = {
        todoid: existingid,
        taskString: task,
        completedString: completed,
      };
      return { ...state, todos: todoarr };
    // let todotemp = { todos: [...state.(...todos)] };
    // todotemp.todos[action.payload.todoid].taskString =
    // action.payload.taskString;
    // let todotemp2 = [...todotemp.todos];
    // todotemp2[action.payload.todoid].taskString = action.payload.taskString;
    // todotemp['todos'][action.payload.todoid].taskString =
    // action.payload.taskString;
    // todotemp['todos'][action.payload.todoid].completedString =
    // action.payload.completedString;
    //return { todotemp };
    case todoActions.DELETE_TODO_SUCCESS:
      const dlttemp=[...state.todos];
      console.log("dlttemp is  ",dlttemp);
      console.log("state is  ",state);
      console.log("state.todos is  ",state.todos);
      dlttemp.splice(action.payload.id,1);
      return {...state,todos:dlttemp}
    default:
      return state;
  }
}
